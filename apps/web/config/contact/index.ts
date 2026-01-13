export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone: string;
  image?: string;
}

export const contactsFirstRow: ContactPerson[] = [
  {
    id: "shiba",
    name: "Shiba Nanda Sethy",
    role: "(Convenor-NITRUTSAV)",
    phone: "+91-76828 66577",
    image:
      "https://res.cloudinary.com/dz4lwydkp/image/upload/v1767477421/nitrutsav-2026/ovwfvrsrhkkw4iigcdzk.jpg",
  },
  {
    id: "sidheshwar",
    name: "Sidheshwar Mahananda",
    role: "(Convenor-NITRUTSAV)",
    phone: "+91-63718 72187",
    image:
      "https://res.cloudinary.com/drf3eatfm/image/upload/v1767139442/nitrutsav-2026/eo2bsfu5xno4fe0dqrse.jpg",
  },
];

export const contactsSecondRow: ContactPerson[] = [
  {
    id: "debadutta",
    name: "Debadutta Nayak",
    role: "(Organizing Team-NITRUTSAV)",
    phone: "+91-78550 34580",
    image:
      "https://res.cloudinary.com/drf3eatfm/image/upload/v1767139442/nitrutsav-2026/eo2bsfu5xno4fe0dqrse.jpg",
  },
  {
    id: "shrinmaya",
    name: "Shrinmaya Mallick",
    role: "(Organizing Team-NITRUTSAV)",
    phone: "+91-72052 73401",
    image:
      "https://res.cloudinary.com/drf3eatfm/image/upload/v1767139442/nitrutsav-2026/eo2bsfu5xno4fe0dqrse.jpg",
  },
];

export const instituteInfo = {
  name: "NATIONAL INSTITUTE OF TECHNOLOGY ROURKELA",
  location: `SRICCE OFFICE NIT ROURKELA, NATIONAL INSTITUTE
OF TECHNOLOGY,ROURKELA, SECTOR-02, ROURKELA, Sundargarh, Odisha, 769008`,
};
