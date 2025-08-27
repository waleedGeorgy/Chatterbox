import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Toast from "../components/Toast";
import { Camera, Mail, User2, Calendar1 } from "lucide-react";

const ProfilePage = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const userInitials = authUser?.name ? authUser.name.split(" ") : ["U"];

  const userProfileCreationDate = authUser?.createdAt
    ? authUser.createdAt.split("T")[0]
    : new Date().toISOString().split("T")[0];
  const readableDate = new Date(userProfileCreationDate).toLocaleString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const handleImageUpdate = async (e) => {
    const MAX_SIZE = 3 * 1024 * 1024;

    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      Toast("error", "Chosen file is too large");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfile({ profilePic: base64Img });
    };
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-base-200 pt-5 font-inter">
      <div className="max-w-2xl mx-auto p-6 bg-base-300 rounded-xl space-y-8 shadow-md">
        <h1 className="text-3xl font-bold text-center font-roboto">
          Profile Info
        </h1>
        <div className="flex flex-col items-center justify-center gap-y-4 w-full">
          <div className="avatar avatar-placeholder relative size-40">
            {selectedImg ? (
              <img
                src={selectedImg}
                alt={`Picture of ${authUser.name}`}
                className="rounded-full size-full object-cover ring-primary ring-2"
              />
            ) : authUser.profilePic && authUser.profilePic.length !== 0 ? (
              <img
                src={authUser.profilePic}
                alt={`Picture of ${authUser.name}`}
                className="rounded-full size-full object-cover ring-primary ring-2"
              />
            ) : (
              <div className="bg-base-200 text-neutral-content size-full rounded-full ring-primary ring-2">
                <span className="text-6xl">
                  {userInitials.map((word) => word[0])}
                </span>
              </div>
            )}
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-300 hover:scale-110 hover:animate-wiggle p-2 rounded-full cursor-pointer transition-all duration-300 ring-1 ${
                isUpdatingProfile ? "animate-spin pointer-events-none" : ""
              } `}
            >
              <Camera className="size-5" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpdate}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          {isUpdatingProfile ? (
            <p className="opacity-70 text-sm animate-pulse text-center font-bold">
              Updating
            </p>
          ) : (
            <p className="opacity-70 text-sm italic">
              Update your profile picture (maximum image size is{" "}
              <span className="font-bold">3 MBs</span>).
            </p>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex flex-row flex-wrap items-center justify-between bg-base-200 px-4 py-2 rounded-xl outline-2 outline-base-100">
            <div className="flex flex-row items-center space-x-2">
              <User2 size={20} />
              <h3 className="font-roboto">Name</h3>
            </div>
            <p className="font-bold">{authUser.name}</p>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-between bg-base-200 px-4 py-2 rounded-xl outline-2 outline-base-100">
            <div className="flex flex-row items-center space-x-2">
              <Mail size={20} />
              <h3 className="font-roboto">Email</h3>
            </div>
            <p className="font-bold">{authUser.email}</p>
          </div>
          <div className="flex flex-row flex-wrap items-center justify-between bg-base-200 px-4 py-2 rounded-xl outline-2 outline-base-100">
            <div className="flex flex-row items-center space-x-2">
              <Calendar1 size={20} />
              <h3 className="font-roboto">Member since</h3>
            </div>
            <p className="font-bold">{readableDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
