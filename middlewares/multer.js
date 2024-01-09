import multer from "multer";
import path from "path";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import Slide from "../models/Slide.js";

dotenv.config();

const s3 = new S3({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Definindo a extensão que eu quero para o multer filtrar
const pptxFileFilter = (req, file, cb) => {
  const allowedExtensions = ["pptx"];

  const extension = file.originalname.split(".").pop().toLowerCase();
  const isAllowed = allowedExtensions.includes(extension);

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Erro na extensão do arquivo. Apenas arquivos pptx são permitidos!"
      ),
      false
    );
  }
};

export const uploadSlideS3 = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, //possibilita ao browser ler o arquivo em tela em vez de fazer o download direto que é o default
    acl: "public-read", //permitir que os arquivos sejam publicos
    key: (req, file, cb) => {
      const filename = `${uuidv4()} - ${decodeURIComponent(file.originalname)}`;
      const folder = "sliders";
      cb(null, `${folder}/${filename}`);
    },
  }),
  fileFilter: pptxFileFilter,
});

export const deleteSlideS3 = async (req, res, next) => {
  const slide = await Slide.findById(req.params.id);

  try {
    // Procurando se o arquivo existe no s3:
    const headObjectResponse = await s3.headObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: slide.key,
    });

    // Deletando o arquivo existente:
    const response = await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: slide.key,
    });
    console.log("Arquivo deletado com sucesso no S3");
    return next();
  } catch (error) {
    console.log(error); //se der erro 404 é que não foi encontrado no S3
    return res
      .status(500)
      .json({ Erro: "Ocorreu um erro na exclusão do arquivo no S3" });
  }
};

// Salvando na pasta local... (usado para testes)
export const upMusicMulterLocal = multer({
  dest: path.resolve("tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve("tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err) => {
        if (err) cb(err);
        const fileName = `${uuidv4()}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
