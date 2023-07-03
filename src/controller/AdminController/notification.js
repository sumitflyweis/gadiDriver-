const User = require("../../model/userModel");
const notification = require("../../model/notification");
exports.sendNotification = async (req, res) => {
        try {
                const admin = await User.findById({ _id: req.user._id });
                if (!admin) {
                        return res.status(404).json({ status: 404, message: "Admin not found" });
                } else {
                        if (req.body.total == "ALL") {
                                let userData = await userModel.find({ userType: req.body.sendTo });
                                if (userData.length == 0) {
                                        return res.status(404).json({ status: 404, message: "Employee not found" });
                                } else {
                                        for (let i = 0; i < userData.length; i++) {
                                                let obj = {
                                                        userId: userData[i]._id,
                                                        title: req.body.title,
                                                        body: req.body.body,
                                                        date: req.body.date,
                                                        time: req.body.date,
                                                }
                                                await notification.create(obj)
                                        }
                                        let obj1 = {
                                                userId: admin._id,
                                                title: req.body.title,
                                                body: req.body.body,
                                                date: req.body.date,
                                                time: req.body.date,
                                        }
                                        await notification.create(obj1)
                                        return res.status(200).json({ status: 200, message: "Notification send successfully." });
                                }
                        }
                        if (req.body.total == "SINGLE") {
                                let userData = await userModel.findById({ _id: req.body._id, userType: req.body.sendTo });
                                if (!userData) {
                                        return res.status(404).json({ status: 404, message: "Employee not found" });
                                } else {
                                        let obj = {
                                                userId: userData._id,
                                                title: req.body.title,
                                                body: req.body.body,
                                                date: req.body.date,
                                                time: req.body.date,
                                        }
                                        let data = await notification.create(obj)
                                        if (data) {
                                                let obj1 = {
                                                        userId: admin._id,
                                                        title: req.body.title,
                                                        body: req.body.body,
                                                        date: req.body.date,
                                                        time: req.body.date,
                                                }
                                                await notification.create(obj1)
                                                return res.status(200).json({ status: 200, message: "Notification send successfully.", data: data });
                                        }
                                }
                        }
                }
        } catch (err) {
                res.status(400).json({ message: err.message });
        }
}
exports.allNotification = async (req, res) => {
        try {
                const admin = await User.findById({ _id: req.user._id });
                if (!admin) {
                        return res.status(404).json({ status: 404, message: "Admin not found" });
                } else {
                        let findNotification = await notification.find({ userId: admin._id });
                        if (findNotification.length == 0) {
                                return res.status(404).json({ status: 404, message: "Notification data not found successfully.", data: {} })
                        } else {
                                return res.status(200).json({ status: 200, message: "Notification data found successfully.", data: findNotification })
                        }
                }
        } catch (err) {
                res.status(400).json({ message: err.message });
        }
}




