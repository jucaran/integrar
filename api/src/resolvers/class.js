import path from "path";
import { createWriteStream } from "fs";
import Class from "../models/Class";

export const getClasses = async (_, { _id }) => {
  if (_id) return await Class.findById(_id);
  else return await Class.find();
};

export const createClass = async (_, { input }) => {
  // input should have: name:string, module:ID
  const newClass = await new Class(input).save();

  const module = await Module.findById(input.module);

  if (module) {
    module.push(newClass._id);
    await module.save();
  }
};

export const editClass = async (_, { _id, input }) => {
  let _class = await Class.findById(_id);

  if (!_class) return false;

  input.name ? (_class.name = input.name) : null;
  input.files ? (_class.files = input.files) : null;
  input.homework ? (_class.homework = input.homework) : null;
  input.correction ? (_class.correction = input.correction) : null;
  input.test ? (_class.test = input.test) : null;

  await _class.save();
};

/**
 * This resolver receives a class id and a file and uploads it to the
 * /uploads folder in the server
 * also it pushes the file name to the "files" atribute of Class model
 * so in the fron we can call it to download it
 */
export const uploadClassFile = async (_, { file, classId }) => {
  const { createReadStream, filename } = await file;
  const filePath = path.join(__dirname, "../uploads/", filename);

  const _class = await Class.findById(classId);

  if (!_class) return { status: false };

  _class.files.push(filename);
  _class.save();

  await new Promise((res) =>
    createReadStream()
      .pipe(createWriteStream(filePath))
      .on("error", function (err) {
        console.log(err);
      })
      .on("close", res)
  );

  return {
    status: true,
  };
};