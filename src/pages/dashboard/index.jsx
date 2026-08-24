import React, { useEffect, useContext } from "react";
import "./styles.css";
import { endpoint } from "@/config/endpoints";
import { Box, Grow } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import AllList from "./list";
import DashboardHeader from "./header";
import { AppContext } from "@/contexts/app";
import useApi from "@/hooks/useApi";
import { UpcomingRounded } from "@mui/icons-material";
import M3uSearch from "./search/m3u";
import SearchItems from "./search";
import Loading from "@/utils/loading";

const Dashboard = () => {
  const { makeRequest } = useApi();
  const currentAction = useSearchParams().get("view");
  const router = useRouter();
  const { user, streamData } = useContext(AppContext);
  const getBannerStreams = async (streams) => {
    const { movies } = streamData;
    if (streams && streams.length > 0) {
      const start = Math.max(0, Math.floor(streams.length / 2) - 4);
      const end = Math.min(streams.length, start + 5);
      const bannerSlice = streams.slice(start, end);
      const moviesIds = bannerSlice.map((movie) => movie.stream_id).filter(Boolean);

      if (moviesIds.length > 0) {
        try {
          const response = await makeRequest().post(endpoint.getBannerMovies, {
            moviesIds,
          });
          if (
            response?.data?.message &&
            response.data.message !== "Something went wrong" &&
            Array.isArray(response.data.message) &&
            response.data.message.length > 0
          ) {
            movies.banner.toggle(response.data.message);
            return;
          }
        } catch (error) {
          console.log("getBannerMovies error:", error);
        }
      }
      // Fallback: use raw movie streams if API request fails or returns invalid message
      movies.banner.toggle(bannerSlice);
    } else {
      movies.banner.toggle(null);
    }
  };

  const getData = async (endpoint, type) => {
    const { movies, series, liveTv } = streamData;
    try {
      const response = await makeRequest().get(endpoint);
      const { message } = response.data;
      const fetchedData = message === "Something went wrong!" ? [] : message;
      switch (type) {
        case "movies":
          movies.toggle(fetchedData, "streams");
          getBannerStreams(fetchedData);
          break;
        case "moviesCategories":
          movies.toggle(fetchedData, "categories");
          break;
        case "series":
          series.toggle(fetchedData, "streams");
          series.banner.toggle(fetchedData.slice(0, 4));
          break;
        case "seriesCategories":
          series.toggle(fetchedData, "categories");
          break;
        case "livetv":
          liveTv.toggle(fetchedData, "streams");
          break;
        case "liveCategories":
          liveTv.toggle(fetchedData, "categories");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const conditionVerified = () => {
    const { movies, series } = streamData;
    if (currentAction === "movies") {
      return movies.streams && movies.streamCategories;
    }
    if (currentAction === "series") {
      return series.streams && series.streamCategories;
    }
    if (currentAction === "mylist" || currentAction === "watchlist") {
      return true;
    }
    return true;
  };

  const dataFetched = () => {
    if (user.loginType === "m3u") {
      return true;
    } else {
      return (
        streamData.movies.streams &&
        streamData.movies.streamCategories &&
        streamData.series.streams &&
        streamData.series.streamCategories &&
        streamData.liveTv.streams
      );
    }
  };

  useEffect(() => {
    if (user && user.loginType !== "m3u") {
      getData(endpoint.getMovies, "movies");
      getData(endpoint.getMovieCategories, "moviesCategories");
      getData(endpoint.getSeries, "series");
      getData(endpoint.getSeriesCategories, "seriesCategories");
      getData(endpoint.getLiveStreams, "livetv");
      getData(endpoint.getLiveCategories, "liveCategories");
    }
  }, [user, currentAction]);
  useEffect(() => {
    router.beforePopState(() => {
      router.push("/playlists");
    });
    return () => router.beforePopState(false);
  }, []);

  return user && dataFetched() ? (
    <div style={{ backgroundColor: '#080c18', minHeight: '100vh', width: '100%' }}>
      <DashboardHeader
        dataFetched={dataFetched}
        currentAction={currentAction}
      />
      {currentAction === "search" ? (
        user && user.loginType === "m3u" ? (
          <M3uSearch />
        ) : (
          <SearchItems />
        )
      ) : user && user.loginType === "m3u" ? (
        <AllList currentAction={currentAction} />
      ) : currentAction === "movies" || currentAction === "series" || currentAction === "mylist" || currentAction === "watchlist" ? (
        conditionVerified() ? (
          <>
            <AllList currentAction={currentAction} />
          </>
        ) : (
          <Loading />
        )
      ) : (
        <>
          <br />
          <Grow className="invalid-user-popup" in={true}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <UpcomingRounded className="cross-icon" color="error" />
              <p className="invalid-title">Coming Soon</p>
            </Box>
          </Grow>
        </>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
