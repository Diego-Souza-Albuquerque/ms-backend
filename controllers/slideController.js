import Slide from "../models/Slide.js";

export const getAllSlides = async (req, res) => {
  try {
    const slides = await Slide.find();

    return res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const getSpecificSlide = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    return res.json(slide);
  } catch (error) {
    res.status(500).json({ msg: "Slide não encontrado" });
    console.log(error);
  }
};

export const uploadSlide = async (req, res) => {
  try {
    const { title, author } = req.body;
    const slide = await Slide.create({
      title: title,
      author: author,
      name: req.file.originalname,
      size: req.file.size,
      key: req.file.key,
      url: req.file.location,
    });

    return res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const deleteSlide = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);

    await Slide.findByIdAndDelete(slide._id);
    res.status(200).json({ msg: "Slide excluido com sucesso" });
  } catch (error) {
    console.log(error);
  }
};
