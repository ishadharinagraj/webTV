import axios from 'axios';

const DNS_API_KEY = process.env.NEXT_PUBLIC_DNS_SECRET_KEY || "thisisdnsvalidationkey";

/**
 * Extracts and cleans the DNS URL input entered dynamically by the user.
 */
export const extractDnsDomain = (url) => {
    if (!url) return '';
    return url.trim();
};

/**
 * Validates whether the dynamic serverAddress / DNS entered by the user is whitelisted.
 * Calls POST http://localhost:8080/api/check-dns with x-api-key header and { dns: userEnteredDns }
 * 
 * @param {string} serverAddress Dynamic server address entered by user in the UI form
 * @returns {Promise<{ isWhitelisted: boolean, message: string }>}
 */
export const validateDns = async (serverAddress) => {
    if (!serverAddress) {
        return { isWhitelisted: false, message: 'Server address is required' };
    }

    // Optional bypass for development / initial testing before admin DB entries are added
    if (process.env.NEXT_PUBLIC_DISABLE_DNS_CHECK === "true") {
        return { isWhitelisted: true, message: 'DNS check disabled in development' };
    }

    // Dynamic DNS value entered by the user in the login/playlist form
    const userEnteredDns = extractDnsDomain(serverAddress);

    try {
        const baseUrl = process.env.NEXT_PUBLIC_ADMIN_BACKEND_URL || 'https://adminbe-q7mh.onrender.com';

        let response;
        try {
            response = await axios.post(`${baseUrl}/api/check-dns`, {
                dns: userEnteredDns,
                key: DNS_API_KEY,
                apiKey: DNS_API_KEY
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': DNS_API_KEY
                },
                timeout: 25000
            });
        } catch (primaryErr) {
            // Fallback attempt on port 8000 if 8080 fails with network error
            if (!primaryErr.response && baseUrl.includes('8080')) {
                const fallbackUrl = 'https://adminbe-q7mh.onrender.com';
                response = await axios.post(`${fallbackUrl}/api/check-dns`, {
                    dns: userEnteredDns,
                    key: DNS_API_KEY,
                    apiKey: DNS_API_KEY
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': DNS_API_KEY
                    },
                    timeout: 25000
                });
            } else {
                throw primaryErr;
            }
        }

        const isWhitelisted = Boolean(
            response.data?.isWhitelisted ?? response.data?.allowed ?? response.data?.success
        );

        return {
            isWhitelisted: isWhitelisted,
            message: response.data?.message || (isWhitelisted ? 'DNS is authorized' : 'This DNS / Server URL is not whitelisted!')
        };

    } catch (error) {
        console.error('DNS Whitelist Validation Error:', error);

        const errorMsg = error.response?.data?.message || error.message || 'Failed to verify DNS whitelist';
        return { isWhitelisted: false, message: `DNS Verification Failed: ${errorMsg}` };
    }
};
