import Subject from "../models/Subject";
import Course from "../models/Course"

// Query
export const allSubjects = async (_, args, ctx) => {
  if (args._id) {
    return await Subject.find({ _id: args._id });
  } else {
    return await Subject.find();
  }
}

// Mutations
export const createSubject = async (_, args, ctx) => {
  const newSubject = await new Subject(args.input).save();

  let course = await Course.findById(args.input.course)
  course && course.subjects.push(newSubject._id)
  course && await course.save()
  console.log("lis anda a cagar", course.subjects)

  return newSubject
}

export const editSubject = async (_, args, ctx) => {
  // return await Subject.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true }
  // );

  let subject = await Subject.findById(args._id)

  args.input.name ? (subject.name = args.input.name) : null
  // args.input.courses ? (subject.courses = args.input.courses) : null
  args.input.teachers ? (subject.teachers = args.input.teachers) : null
  // args.input.class ? (subject.class = args.input.class) : null

  await subject.save()

  return subject

}

export const deleteSubject = async (_, args, ctx) => {
  return await Subject.findByIdAndDelete(args._id);
}