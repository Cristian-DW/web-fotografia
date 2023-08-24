import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Avatar,
  Typography,
} from "@material-tailwind/react";

export function ImageWithPopover({ imageUrl, name, username, bio, fecha, ubication, }) {
  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <div className="relative inline-block ">
      <img width='auto' height='auto'
        src={imageUrl}
        alt={name}
        className="object-cover w-24 h-auto  cursor-pointer"
        {...triggers}
      />
      <Popover
        open={openPopover}
        handler={setOpenPopover}
        className="w-full h-56"
      >
        <PopoverHandler>
          <div className="absolute top-0 right-10 ">
            <Button variant="text" className="hidden">Profile Info</Button>
          </div>
        </PopoverHandler>
        <PopoverContent
          className="z-50 max-w-[20rem] bg-black "
          {...triggers}
        >
          {/* Popover Content */}
          <div className="mb-2 flex items-center justify-between gap-4 p-2">
            <Avatar size="md" variant="circular" src={imageUrl} alt={name} />
            <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 flex items-center gap-2 font-medium "
          >
            <span>{name}</span> {" "}
          </Typography>
          </div>
          
          <Typography variant="small" color="gray" className="font-light px-2 text-sm">
            {bio}
          </Typography>
          <div className="mt-6 flex items-center gap-8 border-t border-blue-gray-50 pt-4">
            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-1 text-xs font-normal p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="-mt-0.5 h-3.5 w-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {ubication}
            </Typography>
            <Typography
              as="a"
              href="#"
              variant="small"
              color="gray"
              className="flex items-center gap-1 text-xs font-normal"
            >
            {fecha}
            </Typography>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
