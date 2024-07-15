import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);
  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "All Admin are fetched successfully",
    data: result,
  });
});

const getAdminById = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(adminId);

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Admin is fetched successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin: adminData } = req.body;

  const result = await AdminServices.updateAdminIntoDB(adminId, adminData);

  sendResponse(res, {
    statuseCode: httpStatus.OK,
    success: true,
    message: "Admin is updated successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
};
