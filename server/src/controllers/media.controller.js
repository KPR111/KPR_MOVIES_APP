import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    console.log(page)
    // console.log("1111zero")

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType
    });

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    console.log("first")

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    console.log("1")

    media.credits = await tmdbApi.mediaCredits(params);

    console.log("2")


    const videos = await tmdbApi.mediaVideos(params);

    console.log("3")


    media.videos = videos;

    console.log("4")


    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    console.log("5")


    media.images = await tmdbApi.mediaImages(params);

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);

    console.log("6")


    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
        media.isFavorite = isFavorite !== null;
      }
    }

    console.log("47")
    media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");
    console.log("8")
    responseHandler.ok(res, media);
  } catch (e) {
    // console.log(e);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };