import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketID, io } from "../lib/socket.js";

export const getSidebarUsers = async (req, res) => {
  try {
    const currentUserID = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: currentUserID },
    }).select("-password");
    return res.status(201).json(filteredUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: otherUserID } = req.params;
    const myID = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderID: myID, receiverID: otherUserID },
        { senderID: otherUserID, receiverID: myID },
      ],
    });

    return res.status(201).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._id;

    let imageURL;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "Chatterbox/chat-pics",
      });
      const secured_url = cloudinary.url(uploadedImage.public_id, {
        transformation: [
          {
            fetch_format: "auto",
            quality: "auto",
          },
        ],
      });
      imageURL = secured_url;
    }

    const newMessage = new Message({
      senderID,
      receiverID,
      text,
      image: imageURL,
    });

    await newMessage.save();

    const receiverSocketID = getReceiverSocketID(receiverID);
    if (receiverSocketID) {
      io.to(receiverSocketID).emit("sendNewMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
