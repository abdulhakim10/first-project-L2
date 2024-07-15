import { model, Schema } from "mongoose";
import { FacultyModel, TFaculty, TUserName } from "./faculty.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

// const genderSchema = new Schema<TGender>({
//   type: {
//     type: String,
//     enum: ["Male", "Female", "Other"],
//     required: [true, "Gender is required"],
//   },
// });

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, "Contact number is required"],
    },
    blodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImage: { type: String, default: "" },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic Faculty is required"],
      ref: "AcademicFaculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

facultySchema.virtual("fullName").get(function () {
  return (
    this?.name?.firstName +
    " " +
    this?.name?.middleName +
    " " +
    this?.name?.lastName
  );
});

// query middleware
facultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// implement the isUserExist method
facultySchema.statics.isUserExist = async function (
  id: string
): Promise<TFaculty | null> {
  return await this.findOne({ id });
};

export const Faculty = model<TFaculty, FacultyModel>("Faculty", facultySchema);
