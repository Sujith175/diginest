import { useReducer, createContext } from "react";
import { bookReducer } from "../Reducers/mediaReducer";

export const MediaContext = createContext();

const MediaContextProvider = (props) => {
  const [media, dispatch] = useReducer(bookReducer, [
    {
      id: 1,
      section: "Gallery",
      title: "New Discounts",
      subheading: "Lorem Ipsum is simply dummy text ...",
      mediatype: "Image",
      link: "https://in.pinterest.com/",
    },
    {
      id: 2,
      section: "Gallery",
      title: "Events",
      subheading: "-",
      mediatype: "Video",
      link: "https://www.youtube.com/",
    },
    {
      id: 3,
      section: "News",
      title: "Press Release",
      subheading: "Lorem Ipsum is simply dummy text ...",
      mediatype: "Video",
      link: "https://www.youtube.com/",
    },
  ]);
  console.log(media);

  return (
    <MediaContext.Provider value={{ media, dispatch }}>
      {props.children}
    </MediaContext.Provider>
  );
};
export default MediaContextProvider;
