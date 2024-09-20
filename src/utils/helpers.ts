import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const setTokenWithExpiry = (key: string, token: string, expiryInMs: number) => {
  const now = new Date();
  const expiryDate = now.getTime() + expiryInMs;
  const tokenWithExpiry = {
    value: token,
    expiry: expiryDate,
  };
  localStorage.setItem(key, JSON.stringify(tokenWithExpiry));
};

export const getTokenWithExpiry = (key: string) => {
  const tokenItem = localStorage.getItem(key);
  if (!tokenItem) return null;

  const tokenWithExpiry = JSON.parse(tokenItem);
  const now = new Date();

  if (now.getTime() > tokenWithExpiry.expiry) {
    localStorage.removeItem(key); // Remove expired token
    return null;
  }

  return tokenWithExpiry.value;
};

export function getInitials(name: string): string {
  // Split the name into words
  const words = name.split(" ");
  const initials = words?.[0]?.[0] + words?.[1]?.[0];
  return initials;
}

const columns = [
  { name: "S/N", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

export { columns, users };

