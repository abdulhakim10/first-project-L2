import { model, Schema } from "mongoose";
import { AdminModel, TAdmin, TUserName } from "./admin.interface";
import { BloodGroup, Gender } from "./admin.constant";

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

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, "Id is required"],
      unique: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Gender is required"],
    },
    contactNo: {
      type: String,
      required: [true, "Contact Number is required."],
    },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency Contact Number is required."],
    },
    dateOfBirth: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not valid blood group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImage: {
      type: String,
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
adminSchema.virtual("fullName").get(function () {
  return (
    this?.name?.firstName +
    " " +
    this?.name?.middleName +
    " " +
    this?.name?.lastName
  );
});

// implement is user exist function

adminSchema.statics.isUserExist = async function (
  id: string
): Promise<TAdmin | null> {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>("Admin", adminSchema);
