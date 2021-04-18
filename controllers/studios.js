const Studio = require('../models/Studio');

exports.index = async (request, response, next) => {
  try {
    const studios = await Studio.find();
    
    response.status(200)
    .json(studios);
  } catch (error) {
    next(error);
  }
};

exports.show = async (request, response, next) => {
  try {
    const { id } = request.params;
    const studio = await Studio.findById(id);
    const games = await studio.getGames();

    response.status(200)
    .json({ ...studio._doc, games });
  } catch (error) {
    next(error);
  }
};

exports.create = async (request, response, next) => {
  try {
    const { name } = request.body;
    const studio = await Studio.create({
      name
    });

    response.status(200)
    .json({
      message: "Studio was created successfully",
      status: "success",
      studio
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (request, response, next) => {
  try {
    const { id, name } = request.body;

    await Studio.findOneAndUpdate({ _id: id }, { name });
    const studio = await Studio.findById(id);

    response.status(200)
    .json({
      message: "Studio was updated successfully",
      status: "success",
      studio
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (request, response, next) => {
  try {
    const { id } = request.body;

    await Studio.findOneAndDelete({ _id: id });

    response.status(200)
    .json({
      message: "Studio was deleted successfully",
      status: "success"
    });
  } catch (error) {
    next(error);
  }
};