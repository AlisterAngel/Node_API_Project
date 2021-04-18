const Game = require('../models/game');

exports.index = async (request, response, next) => {
  try {
    const games = await Game.find().populate('studio');

    response.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

exports.show = async (request, response, next) => {
  try {
    const { id } = request.params;

    const game = await Game.findById(id).populate('studio');

    response.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

exports.create = async (request, response, next) => {
  try {
    const {
      title,
      year,
      synopsis,
      rating,
      studio
    } = request.body;

    const game = await Game.create({
      title,
      year,
      synopsis,
      rating,
      studio
    });

    response.status(200).json({
      message: "Game was created successfully",
      status: "success",
      game
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (request, response, next) => {
  try {
    const {
      id,
      title,
      year,
      synopsis,
      rating,
      studio
    } = request.body;

    await Game.findOneAndUpdate({ _id: id }, {
      id,
      title,
      year,
      synopsis,
      rating,
      studio
    });

    const game = await Game.findById(id);

    response.status(200).json({
      message: "Game was updated successfully",
      status: "success",
      game
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (request, response, next) => {
  try {
    const { id } = request.body;

    await Game.findOneAndDelete({ _id: id });

    response.status(200).json({
      message: "Game was deleted successfully",
      status: "success"
    });
  } catch (error) {
    next(error);
  }
};
