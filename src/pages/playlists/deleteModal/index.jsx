import { Dialog, Grow } from "@mui/material";
import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded';
import "./styles.css";

const DeleteModal = ({ deleteProfile, open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(5, 8, 20, 0.85)',
                    backdropFilter: 'blur(12px)',
                }
            }}
            PaperProps={{ className: 'delete-modal-paper' }}
        >
            <Grow in={open}>
                <div className="deleteModalContainer">
                    <div className="deleteIconBadge">
                        <DeleteForeverRounded className="deleteWarningIcon" />
                    </div>
                    
                    <h3 className="deleteModalTitle">Delete Playlist?</h3>
                    <p className="deleteModalSubtitle">
                        Are you sure you want to delete this playlist profile? This action cannot be undone.
                    </p>

                    <div className="deleteModalActions">
                        <button type="button" onClick={deleteProfile} className="confirmDeleteBtn">
                            Yes, Delete
                        </button>
                        <button type="button" onClick={onClose} className="cancelDeleteBtn">
                            Cancel
                        </button>
                    </div>
                </div>
            </Grow>
        </Dialog>
    );
};

export default DeleteModal;