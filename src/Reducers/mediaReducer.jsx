import { v4 as uuidv4 } from "uuid";

export const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          title: action.media.title,
          subheading: action.media.subheading,
          mediatype: action.media.mediatype,
          link: action.media.link,
          section: action.media.section,
          id: uuidv4(),
        },
      ];
    case "REMOVE_MEDIA":
      return state.filter((media) => media.id !== action.id);

    case "EDIT_MEDIA":
      return state.map((media) => {
        return media.id === action.media.id
          ? { ...media, ...action.media }
          : media;
      });
    default:
      throw new Error("unhandled action type");
  }
};
