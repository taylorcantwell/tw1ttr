var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// server.js
var server_exports = {};
__export(server_exports, {
  handler: () => handler
});

// ../../node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// server.js
var import_netlify = require("@remix-run/netlify");

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links2,
  loader: () => loader,
  meta: () => meta
});
var import_react20 = require("@remix-run/react");

// app/helpers/formatDate.ts
var import_dayjs = __toESM(require("dayjs"));
function formatDate(date) {
  return (0, import_dayjs.default)(date).format("ddd, MMM D, YYYY h:mm A");
}

// app/helpers/composeRequest.ts
var composeRequestInit = ({
  cookie,
  body,
  method = "GET",
  signal
}) => {
  return __spreadValues({
    method,
    signal,
    headers: __spreadProps(__spreadValues({}, cookie && { Cookie: cookie }), {
      "Content-Type": "application/json"
    }),
    credentials: "include"
  }, body && { body: JSON.stringify(body) });
};
var fetchRequest = async (url, requestInitOptions) => {
  const requestInit = composeRequestInit(requestInitOptions);
  const response = await fetch(url, requestInit);
  return await response.json();
};

// app/helpers/unpackRequest.ts
var unpackRequest = async (request) => {
  const body = await request.formData();
  const cookie = request.headers.get("Cookie");
  return __spreadValues(__spreadValues({}, cookie && { cookie: request.headers.get("Cookie") }), Object.fromEntries(body));
};
var getCookie = (request) => {
  return request.headers.get("Cookie");
};

// app/config.ts
var isDevelopment = true;
var config = {
  backend: {
    url: isDevelopment ? "http://localhost:4000/v1" : process.env.API_URL
  }
};

// app/helpers/apiEndpoints.server.ts
var BASE_URL = config.backend.url;
var apiEndpoints = {
  tweets: {
    createTweet: `${BASE_URL}/tweet`,
    getHomeTweets: `${BASE_URL}/tweet/home`,
    getProfile: (username) => `${BASE_URL}/tweet/user/${username}`,
    getProfileTweets: (username) => `${BASE_URL}/user/${username}`,
    getTweet: (tweetId) => `${BASE_URL}/tweet/${tweetId}`,
    getTweetById: (tweetId) => `${BASE_URL}/tweet/${tweetId}`
  },
  comments: {
    comment: (tweetId) => `${BASE_URL}/comment/${tweetId}`,
    likeComment: (commentId) => `${BASE_URL}/comment/${commentId}/like`
  },
  likes: {
    likeTweet: (tweetId) => `${BASE_URL}/like/${tweetId}`,
    getLikersForTweet: (tweetId) => `${BASE_URL}/like/${tweetId}/likers`
  },
  retweets: {
    retweet: (tweetId) => `${BASE_URL}/retweet/${tweetId}`,
    getRetweetersForTweet: (tweetId) => `${BASE_URL}/retweet/${tweetId}/retweeters`
  },
  follows: {
    follow: (followeeId) => `${BASE_URL}/follow/${followeeId}`,
    getFollowers: (username) => `${BASE_URL}/follow/followers/${username}`,
    getFollowees: (username) => `${BASE_URL}/follow/followees/${username}`
  },
  saves: {
    getBookmarks: `${BASE_URL}/save`,
    saveTweet: (tweetId) => `${BASE_URL}/save/${tweetId}`,
    getSaversForTweet: (tweetId) => `${BASE_URL}/save/${tweetId}/savers`
  },
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    logout: `${BASE_URL}/auth/logout`,
    me: `${BASE_URL}/user/me`
  },
  cloudinary: {
    upload: `${BASE_URL}/cloudinary/upload`
  },
  profile: {
    update: `${BASE_URL}/profile/update`
  }
};

// app/helpers/apiEndpointsClient.ts
var apiEndpointsClient = {
  cloudinary: {
    upload: `http://localhost:4000/v1/cloudinary/upload`
  }
};

// app/helpers/links.ts
var links = {
  profile: (username) => `/${username}`,
  tweet: (tweetId) => `/tweet/${tweetId}`,
  home: "/feed",
  explore: "/explore",
  bookmarks: "/bookmarks",
  login: "/login",
  register: "/register",
  dialogs: {
    saves: "saves",
    likes: "likes",
    retweets: "retweets",
    following: "following",
    followers: "followers"
  }
};

// app/helpers/stopPropagation.ts
function stopPropagation(event) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
}

// app/modules/shared/Buttons/BackArrow.tsx
var import_solid = require("@heroicons/react/solid");
var import_react2 = require("@remix-run/react");
function BackArrow({ className }) {
  const navigator = (0, import_react2.useNavigate)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "container px-5 mx-auto"
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => navigator(-1),
    className: `flex items-center !my-5 text-twitterBlue w-min hover:opacity-80 transition-colors ${className}`
  }, /* @__PURE__ */ React.createElement(import_solid.ArrowLeftIcon, {
    className: `w-5 h-5 mr-3`
  }), /* @__PURE__ */ React.createElement("p", null, "Back")));
}

// app/modules/shared/Buttons/PrimaryButton.tsx
var import_clsx2 = __toESM(require("clsx"));

// app/modules/shared/Loaders/BounceLoader.tsx
var import_clsx = __toESM(require("clsx"));
function BounceLoader({ className }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: (0, import_clsx.default)("flex", className)
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${circleCommonClasses} mr-1 animate-bounce`
  }), /* @__PURE__ */ React.createElement("div", {
    className: `${circleCommonClasses} mr-1 animate-bounce200`
  }), /* @__PURE__ */ React.createElement("div", {
    className: `${circleCommonClasses} animate-bounce400`
  }));
}
var circleCommonClasses = "h-2.5 w-2.5 bg-twitterBlue rounded-full";

// app/modules/shared/Loaders/SpinnerLoader.tsx
function SpinnerLoader() {
  return /* @__PURE__ */ React.createElement("svg", {
    role: "status",
    className: "w-12 h-12 mr-2 text-blue-100 animate-spin fill-twitterBlue",
    viewBox: "0 0 100 101",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
    fill: "currentFill"
  }));
}

// app/modules/shared/Buttons/PrimaryButton.tsx
function PrimaryButton({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  loading
}) {
  return /* @__PURE__ */ React.createElement("button", {
    type,
    disabled,
    loading,
    onClick,
    className: (0, import_clsx2.default)(`self-center py-2 text-xs md:text-sm text-white transition border-2 border-white rounded-lg md:px-7 px-3  bg-twitterBlue hover:text-twitterBlue hover:bg-white hover:border-twitterBlue`, disabled && !loading && "opacity-50 hover:!text-white hover:border-white hover:bg-twitterBlue", loading && "bg-transparent border-2 hover:bg-transparent border-twitterBlue hover:border-twitterBlue hover:border-2", className)
  }, loading ? /* @__PURE__ */ React.createElement(BounceLoader, {
    className: "mt-1"
  }) : children);
}

// app/modules/shared/Buttons/SubmitButton.tsx
var import_remix_validated_form = require("remix-validated-form");
var import_clsx3 = __toESM(require("clsx"));
function SubmitButton({ className }) {
  const isSubmitting = (0, import_remix_validated_form.useIsSubmitting)();
  const { isValid } = (0, import_remix_validated_form.useFormContext)();
  const disabled = isSubmitting || !isValid;
  return /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    disabled,
    className: (0, import_clsx3.default)(className, disabled && "!bg-gray3")
  }, isSubmitting ? "Submitting..." : "Submit");
}

// app/modules/shared/TweetCard/TweetCard.tsx
var import_outline2 = require("@heroicons/react/outline");
var import_react18 = require("@remix-run/react");
var import_clsx8 = __toESM(require("clsx"));

// app/modules/shared/TweetCard/components/TweetCardButtons/TweetCardButtons.tsx
var import_outline = require("@heroicons/react/outline");
var import_react8 = require("@remix-run/react");

// app/modules/shared/TweetCard/components/TweetCardButtons/components/TweetCardButton.tsx
var import_clsx4 = __toESM(require("clsx"));
var import_react7 = require("@remix-run/react");

// app/hooks/useAuthGuard.ts
var import_react5 = require("@remix-run/react");

// app/hooks/useMatchesData.ts
var import_react3 = require("react");
var import_react4 = require("@remix-run/react");
function useMatchesData(id) {
  const matchingRoutes = (0, import_react4.useMatches)();
  const route = (0, import_react3.useMemo)(() => matchingRoutes.find((route2) => route2.id === id), [matchingRoutes, id]);
  return route == null ? void 0 : route.data;
}

// app/hooks/useOptionalUser.ts
function useOptionalUser() {
  return useMatchesData("root");
}

// app/hooks/useAuthGuard.ts
function useAuthGuard(options = {}) {
  const user = useOptionalUser();
  const navigator = (0, import_react5.useNavigate)();
  const redirect4 = options.redirect || true;
  const redirectUrl = options.redirectUrl;
  const defaultRedirectUrl = links.login;
  return () => {
    if (redirect4 && !user) {
      navigator(redirectUrl || defaultRedirectUrl);
    }
    return user;
  };
}

// app/hooks/useImageUpload.ts
var import_react6 = require("react");
var import_uuid = require("uuid");
var import_react_dropzone = require("react-dropzone");
var import_react_use = require("react-use");
function useImageUpload(options) {
  const [images, methods] = (0, import_react_use.useMethods)(createMethods, []);
  const [errors, setErrors] = (0, import_react6.useState)();
  const onDrop = (0, import_react6.useCallback)((acceptedFiles, fileRejections) => {
    setErrors("");
    if (options.maxFiles && images.length >= options.maxFiles && !options.overwrite) {
      setErrors("Max files reached");
      return;
    }
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === "file-too-large") {
          setErrors(err.message);
        }
        if (err.code === "file-invalid-type") {
          setErrors(err.message);
        }
      });
    });
    acceptedFiles.forEach((file) => {
      const abortController = new AbortController();
      const id = (0, import_uuid.v4)();
      const image = {
        id,
        previewUrl: URL.createObjectURL(file),
        uploading: true,
        url: "",
        abortUpload: () => {
          abortController.abort();
          methods.removeImage({ id });
          setErrors("");
        }
      };
      if (options == null ? void 0 : options.overwrite) {
        methods.replaceImage({ image });
      } else {
        methods.addImage({ image });
      }
      blobToBase64(file).then((base64) => {
        return fetch(apiEndpointsClient.cloudinary.upload, composeRequestInit({
          body: { data: base64 },
          signal: abortController.signal,
          method: "POST"
        })).then((res) => res.json()).then(({ url }) => {
          console.log("\u{1F680} ~ file: useImageUpload.ts ~ line 81 ~ .then ~ url", url);
          methods.uploadComplete({ id: image.id, url });
        }).catch((err) => {
          if (err.name !== "AbortError") {
            methods.removeImage({ id });
          }
        });
      });
    });
  }, [images]);
  const dropzone = (0, import_react_dropzone.useDropzone)(__spreadValues({
    onDrop,
    accept: ["image/jpeg", "image/png"],
    noClick: true
  }, options));
  const loading = images.some((image) => image.uploading);
  if (options.maxFiles === 1) {
    return { images: images[0], loading, errors, dropzone };
  }
  return { images, clearImages: methods.clearImages, loading, errors, dropzone };
}
function createMethods(state) {
  return {
    removeImage({ id }) {
      return [...state.filter((img) => img.id !== id)];
    },
    addImage({ image }) {
      return [...state, image];
    },
    uploadComplete({ id, url }) {
      return [
        ...state.map((image) => image.id === id ? __spreadProps(__spreadValues({}, image), { uploading: false, url }) : image)
      ];
    },
    replaceImage({ image }) {
      return [image];
    },
    clearImages() {
      return [];
    }
  };
}
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// app/modules/shared/TweetCard/components/TweetCardButtons/components/TweetCardButton.tsx
function TweetCardButton({
  Icon,
  label,
  actionType,
  tweetId,
  onClick,
  isPressed,
  focusReply
}) {
  const fetcher = (0, import_react7.useFetcher)();
  const disabled = fetcher.state !== "idle";
  const authGuard = useAuthGuard();
  const clickHandler = onClick ? (e) => {
    e.stopPropagation();
    if (!focusReply)
      return null;
    focusReply();
    onClick(e);
  } : (e) => {
    stopPropagation(e);
    if (!tweetId || !actionType)
      return null;
    const user = authGuard();
    if (!user) {
      return null;
    }
    fetcher.submit({ tweetId, actionType }, { method: "post" });
  };
  return /* @__PURE__ */ React.createElement("button", {
    disabled,
    onClick: clickHandler,
    className: (0, import_clsx4.default)(disabled && "opacity-50", "flex items-center px-2  md:px-8 py-2 rounded-lg hover:bg-grayHover transition")
  }, /* @__PURE__ */ React.createElement(Icon, {
    className: (0, import_clsx4.default)(isPressed && "text-twitterBlue", "inline w-6 h-6")
  }), /* @__PURE__ */ React.createElement("span", {
    className: "ml-3"
  }, label));
}

// app/modules/shared/TweetCard/components/TweetCardButtons/TweetCardButtons.tsx
function TweetCardButtons({
  id,
  isLiked,
  isSaved,
  isRetweeted,
  likeCount,
  commentCount,
  saveCount,
  retweetCount,
  isTweetOpen,
  focusReply
}) {
  const tweetId = id.toString();
  const navigator = (0, import_react8.useNavigate)();
  const location = (0, import_react8.useLocation)();
  const isTweetBeingViewed = location.pathname.includes(tweetId);
  return /* @__PURE__ */ React.createElement("div", {
    className: "py-1 border-t border-b border-grayHover text-gray"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-between"
  }, /* @__PURE__ */ React.createElement(TweetCardButton, {
    focusReply,
    Icon: import_outline.ChatAltIcon,
    label: isTweetOpen ? null : commentCount,
    onClick: () => {
      if (isTweetBeingViewed)
        return;
      navigator(links.tweet(tweetId), { state: { commenting: true } });
    }
  }), /* @__PURE__ */ React.createElement(TweetCardButton, {
    tweetId,
    actionType: "retweet",
    label: isTweetOpen ? null : retweetCount,
    Icon: import_outline.RefreshIcon,
    isPressed: isRetweeted
  }), /* @__PURE__ */ React.createElement(TweetCardButton, {
    tweetId,
    actionType: "like",
    label: isTweetOpen ? null : likeCount,
    Icon: import_outline.HeartIcon,
    isPressed: isLiked
  }), /* @__PURE__ */ React.createElement(TweetCardButton, {
    tweetId,
    actionType: "save",
    label: isTweetOpen ? null : saveCount,
    Icon: import_outline.BookmarkIcon,
    isPressed: isSaved
  })));
}

// app/modules/shared/TweetCard/components/TweetCardComments/TweetCardComments.tsx
var import_react11 = require("@remix-run/react");

// app/modules/shared/TweetCard/components/TweetCardComments/components/TweetCardLikeButton.tsx
var import_solid2 = require("@heroicons/react/solid");
var import_clsx5 = __toESM(require("clsx"));
var import_react9 = require("@remix-run/react");
function TweetCardLikeButton({
  likeCount,
  commentId,
  isLiked
}) {
  const fetcher = (0, import_react9.useFetcher)();
  const authGuard = useAuthGuard();
  const isFetching = fetcher.state !== "idle";
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-2 mt-1 text-sm transition-colors text-gray4"
  }, /* @__PURE__ */ React.createElement("button", {
    disabled: isFetching,
    onClick: () => {
      const user = authGuard();
      if (!user) {
        return null;
      }
      fetcher.submit({ commentId: commentId.toString(), actionType: "likeComment" }, { method: "post" });
    },
    className: (0, import_clsx5.default)({ "opacity-50": isFetching }, "flex items-center w-16 hover:text-gray3")
  }, /* @__PURE__ */ React.createElement(import_solid2.HeartIcon, {
    className: (0, import_clsx5.default)("inline w-5 h-5 mr-1", {
      "text-red-400": isLiked
    })
  }), /* @__PURE__ */ React.createElement("span", null, isLiked ? "Liked" : "Like")), /* @__PURE__ */ React.createElement("span", {
    className: "w-16"
  }, likeCount, " Likes"));
}

// app/modules/shared/TweetCard/components/TweetCardComments/TweetCardComments.tsx
var import_framer_motion = require("framer-motion");

// app/modules/shared/UserAvatar.tsx
var import_react10 = require("@remix-run/react");

// app/modules/shared/AvatarPlaceHolder.tsx
var import_clsx6 = __toESM(require("clsx"));
var AvatarPlaceHolder = ({ className }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: (0, import_clsx6.default)("flex items-center justify-center w-full h-full  transition-colors bg-opacity-50 rounded-lg bg-twitterBlue text-twitterBlue hover:bg-opacity-70 text-sm md:text-3xl", className)
  }, "?");
};

// app/modules/shared/UserAvatar.tsx
function UserAvatar({ avatarUrl, username }) {
  if (!username) {
    return /* @__PURE__ */ React.createElement(AvatarPlaceHolder, null);
  }
  return /* @__PURE__ */ React.createElement(import_react10.Link, {
    onClick: (e) => {
      stopPropagation(e);
    },
    to: "/" + username,
    className: "relative self-center flex-shrink-0 w-8 h-8 mr-5 rounded-md md:w-10 md:h-10 md:self-start"
  }, avatarUrl ? /* @__PURE__ */ React.createElement("img", {
    className: "object-cover w-full h-full rounded-lg",
    src: avatarUrl,
    alt: "avatar"
  }) : /* @__PURE__ */ React.createElement(AvatarPlaceHolder, null));
}

// app/modules/shared/TweetCard/components/TweetCardComments/TweetCardComments.tsx
function TweetCardComments({ tweetComments }) {
  const navigator = (0, import_react11.useNavigate)();
  if ((tweetComments == null ? void 0 : tweetComments.length) === 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, tweetComments.map(({ id: commentId, comment, username, createdAt, likeCount, isLiked, avatarUrl }) => {
    return /* @__PURE__ */ React.createElement(import_framer_motion.motion.div, {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
      key: commentId,
      className: "flex py-5 border-t border-grayHover"
    }, /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => {
        stopPropagation(e);
        navigator(links.profile(username));
      },
      className: "flex mr-3 md:w-10 md:h-10 w-8 h-8"
    }, /* @__PURE__ */ React.createElement(UserAvatar, {
      username,
      avatarUrl
    })), /* @__PURE__ */ React.createElement("div", {
      className: "w-full"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "p-4 rounded-md bg-lightGray"
    }, /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => {
        stopPropagation(e);
        navigator(links.profile(username));
      },
      className: "mr-3 font-sans text-black transition-all hover:underline"
    }, username), /* @__PURE__ */ React.createElement("span", {
      className: "text-sm font-noto text-gray4"
    }, formatDate(createdAt)), /* @__PURE__ */ React.createElement("div", {
      className: "py-3 font-noto"
    }, comment), /* @__PURE__ */ React.createElement(TweetCardLikeButton, {
      commentId,
      isLiked,
      likeCount
    }))));
  }));
}

// app/modules/shared/TweetCard/components/TweetCardContent.tsx
var import_react12 = require("@remix-run/react");
var import_react13 = require("@remix-run/react");
function TweetCardContent({ createdAt, content, author, avatarUrl }) {
  const navigator = (0, import_react12.useNavigate)();
  const { username } = (0, import_react13.useParams)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement(UserAvatar, {
    username: author,
    avatarUrl
  }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    onClick: (e) => {
      stopPropagation(e);
      if (username === author) {
        return null;
      }
      navigator(links.profile(author));
    },
    className: "font-sans text-black transition-all cursor-pointer hover:underline"
  }, author), /* @__PURE__ */ React.createElement("p", {
    className: "text-sm text-gray4"
  }, formatDate(createdAt)))), /* @__PURE__ */ React.createElement("p", {
    className: "py-4 font-extralight"
  }, content));
}

// app/modules/shared/TweetCard/components/TweetCardCounters.tsx
var import_react14 = require("@remix-run/react");
function TweetCardCounters({
  saveCount,
  likeCount,
  retweetCount,
  commentCount
}) {
  const counters = [
    {
      count: retweetCount,
      label: "Retweets",
      url: links.dialogs.retweets
    },
    { count: likeCount, label: "Likes", url: links.dialogs.likes },
    { count: saveCount, label: "Saves", url: links.dialogs.saves }
  ];
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-end pt-5 pb-2 text-xs md:text-base text-gray4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mr-4"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "mr-2"
  }, commentCount), /* @__PURE__ */ React.createElement("span", null, "Comments")), counters.map(({ count, label, url }) => {
    return /* @__PURE__ */ React.createElement(import_react14.Link, {
      state: { disableScroll: true },
      to: url,
      replace: true,
      key: label,
      className: "mr-4 transition hover:text-gray3"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "mr-2"
    }, count), /* @__PURE__ */ React.createElement("span", null, label));
  }));
}

// app/modules/shared/TweetCard/components/TweetCardImages.tsx
function TweetCardImages({ images }) {
  if (!images || images.length === 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex gap-4 mb-5 max-h-64 max-w-64"
  }, images.map(({ tweetId, url }) => {
    return /* @__PURE__ */ React.createElement("div", {
      className: "w-40 h-40",
      key: tweetId
    }, /* @__PURE__ */ React.createElement("img", {
      alt: "tweet images",
      key: tweetId,
      src: url,
      className: "object-cover w-full h-full rounded-md"
    }));
  }));
}

// app/modules/shared/TweetCard/components/TweetCardReply.tsx
var import_react15 = require("@remix-run/react");
var import_clsx7 = __toESM(require("clsx"));
var import_react16 = __toESM(require("react"));
var import_react_textarea_autosize = __toESM(require("react-textarea-autosize"));
function TweetCardReply({ tweetId, replyRef, focusReply, clearReply }) {
  var _a;
  const fetcher = (0, import_react15.useFetcher)();
  const location = (0, import_react15.useLocation)();
  const { user } = useOptionalUser();
  const authGuard = useAuthGuard();
  const locationState = location.state;
  const autoFocusCommentInput = locationState == null ? void 0 : locationState.commenting;
  const isFetching = fetcher.state !== "idle";
  const submittedReply = fetcher.type === "done";
  const onSubmit = async (e) => {
    e.preventDefault();
    const user2 = authGuard();
    if (!user2) {
      return null;
    }
    const form = new FormData(e.target);
    const comment = form.get("comment");
    if (!comment)
      return null;
    fetcher.submit({
      tweetId: tweetId.toString(),
      comment,
      actionType: "comment"
    }, { method: "post" });
  };
  (0, import_react16.useEffect)(() => {
    if (autoFocusCommentInput) {
      focusReply();
    }
  }, [focusReply, autoFocusCommentInput]);
  (0, import_react16.useEffect)(() => {
    if (submittedReply) {
      clearReply();
    }
  }, [clearReply, submittedReply]);
  return /* @__PURE__ */ import_react16.default.createElement(fetcher.Form, {
    onSubmit,
    className: "flex my-3 justify-items-stretch"
  }, /* @__PURE__ */ import_react16.default.createElement("div", {
    className: "w-8 h-8 mr-3 md:w-10 md:h-10"
  }, /* @__PURE__ */ import_react16.default.createElement(UserAvatar, {
    avatarUrl: (_a = user == null ? void 0 : user.profile) == null ? void 0 : _a.avatarUrl,
    username: user == null ? void 0 : user.username
  })), /* @__PURE__ */ import_react16.default.createElement(import_react_textarea_autosize.default, {
    className: (0, import_clsx7.default)("flex-grow p-2 border rounded-md resize-none bg-lightGray border-grayHover transition", isFetching && "opacity-50 cursor-auto"),
    ref: replyRef,
    name: "comment"
  }), /* @__PURE__ */ import_react16.default.createElement(PrimaryButton, {
    className: " ml-1 md:ml-5 h-10 md:w-[96px]",
    loading: isFetching,
    type: "submit"
  }, "Reply"));
}

// app/modules/shared/TweetCard/TweetCard.tsx
var import_framer_motion2 = require("framer-motion");

// app/modules/shared/TweetCard/hooks/useTweetReply.ts
var import_react17 = require("react");
function useTweetReply() {
  const replyRef = (0, import_react17.useRef)();
  const focusReply = (0, import_react17.useCallback)(() => {
    if (replyRef.current) {
      replyRef.current.focus();
    }
  }, [replyRef]);
  const clearReply = (0, import_react17.useCallback)(() => {
    if (replyRef.current) {
      replyRef.current.blur();
      replyRef.current.value = "";
    }
  }, [replyRef]);
  return { replyRef, focusReply, clearReply };
}

// app/modules/shared/TweetCard/TweetCard.tsx
function TweetCard({
  tweet: {
    id: tweetId,
    images,
    likeCount,
    commentCount,
    saveCount,
    retweetCount,
    isLiked,
    isSaved,
    isRetweeted,
    isRetweet,
    content,
    createdAt,
    author,
    avatarUrl
  },
  variant,
  comments,
  idx
}) {
  const navigate = (0, import_react18.useNavigate)();
  const { replyRef, focusReply, clearReply } = useTweetReply();
  const isProfileTweets = variant === "profile";
  const isTweetOpen = variant === "open";
  const showRetweetedFlair = isProfileTweets && isRetweet;
  const isFirstCard = idx === 0;
  return /* @__PURE__ */ React.createElement(import_framer_motion2.motion.div, {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
    className: (0, import_clsx8.default)(!isFirstCard && "mt-10")
  }, showRetweetedFlair && /* @__PURE__ */ React.createElement("div", {
    className: "flex mb-2 font-extralight text-twitterBlue"
  }, /* @__PURE__ */ React.createElement(import_outline2.RefreshIcon, {
    className: "w-6 h-6 mr-1"
  }), /* @__PURE__ */ React.createElement("p", null, "Retweeted")), /* @__PURE__ */ React.createElement("article", {
    onClick: () => isTweetOpen ? null : navigate(`/tweet/${tweetId}`),
    tabIndex: 0,
    className: (0, import_clsx8.default)("bg-white shadow-sm cursor-pointer hover:bg-gray-400 p-7 rounded-2xl font-noto text-gray2", isTweetOpen && "!cursor-default")
  }, /* @__PURE__ */ React.createElement(TweetCardContent, {
    content,
    author,
    createdAt,
    avatarUrl
  }), /* @__PURE__ */ React.createElement(TweetCardImages, {
    images
  }), isTweetOpen && /* @__PURE__ */ React.createElement(TweetCardCounters, {
    likeCount,
    commentCount,
    saveCount,
    retweetCount
  }), /* @__PURE__ */ React.createElement(TweetCardButtons, {
    id: tweetId,
    isLiked,
    isSaved,
    isRetweeted,
    likeCount,
    commentCount,
    saveCount,
    retweetCount,
    isTweetOpen,
    focusReply
  }), isTweetOpen && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(TweetCardReply, {
    clearReply,
    focusReply,
    replyRef,
    tweetId
  }), /* @__PURE__ */ React.createElement(TweetCardComments, {
    tweetComments: comments
  }))));
}

// app/modules/shared/ValidatedInput.tsx
var import_remix_validated_form2 = require("remix-validated-form");
function ValidatedInput({
  name,
  label,
  className,
  placeholder,
  defaultValue
}) {
  const { error, getInputProps } = (0, import_remix_validated_form2.useField)(name);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, label ? /* @__PURE__ */ React.createElement("label", {
    htmlFor: name,
    className: "mt-5 mb-1"
  }, label) : null, /* @__PURE__ */ React.createElement("input", __spreadValues({
    defaultValue,
    required: true,
    placeholder,
    className
  }, getInputProps({ id: name }))), /* @__PURE__ */ React.createElement("span", {
    className: "h-2 mt-1 text-red-700"
  }, error));
}

// app/modules/shared/AsideMenu.tsx
var import_clsx9 = __toESM(require("clsx"));
var import_react19 = require("react");
function AsideMenu({ items, ariaLabel }) {
  const [active, setActive] = (0, import_react19.useState)("");
  return /* @__PURE__ */ React.createElement("nav", {
    "aria-label": ariaLabel,
    className: "relative items-start hidden px-5 bg-white shadow-sm rounded-2xl h-60 py-7 md:flex md:flex-col md:justify-between "
  }, items.map(({ description, url }) => {
    const isActive = active === description;
    return /* @__PURE__ */ React.createElement("button", {
      "aria-current": isActive ? "page" : void 0,
      onClick: () => setActive(description),
      key: description,
      className: (0, import_clsx9.default)(isActive && "before:absolute before:w-1 before:h-7 before:left-0 before:rounded-2xl before:align-[50%] before:bg-twitterBlue", commonStyles)
    }, description);
  }));
}
var commonStyles = "flex justify-center py-3 text-sm text-gray3";

// app/modules/shared/Layouts/PrimaryLayoutContainer.tsx
function PrimaryLayoutContainer({ children }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid md:grid-cols-[1fr,3fr] gap-5 container p-5 mt-10 mx-auto md:p-0"
  }, children);
}

// app/modules/shared/TweetList.tsx
function TweetList({ tweets, variant = "home" }) {
  if (!tweets || tweets.length === 0) {
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex items-center justify-center h-full mt-10 text-twitterBlue"
    }, message[variant]);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, tweets.map((tweet) => {
    const key = `${tweet.id}${tweet.isRetweet ? "-retweet" : ""}`;
    return /* @__PURE__ */ React.createElement(TweetCard, {
      key,
      tweet,
      variant
    });
  }));
}
var message = {
  profile: "User hasn't posted or retweeted.",
  home: "No tweets to display."
};

// app/modules/shared/Fade.tsx
var import_framer_motion3 = require("framer-motion");
function Fade({ children, className }) {
  return /* @__PURE__ */ React.createElement(import_framer_motion3.motion.div, {
    className,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }, children);
}

// app/modules/shared/api.server.ts
async function likeTweetMutation(tweetId, cookie) {
  return await fetch(apiEndpoints.likes.likeTweet(tweetId), composeRequestInit({ cookie, method: "POST" }));
}
async function retweetMutation(tweetId, cookie) {
  return await fetch(apiEndpoints.retweets.retweet(tweetId), composeRequestInit({ cookie, method: "POST" }));
}
async function saveTweetMutation(tweetId, cookie) {
  return await fetch(apiEndpoints.saves.saveTweet(tweetId), composeRequestInit({ cookie, method: "POST" }));
}
async function followMutation(followeeId, cookie) {
  return await fetch(apiEndpoints.follows.follow(followeeId), composeRequestInit({ cookie, method: "POST" }));
}

// app/styles/styles.css
var styles_default = "/build/_assets/styles-UWZBE3C7.css";

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/root.tsx
function links2() {
  return [
    { rel: "stylesheet", href: styles_default },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
    }
  ];
}
var meta = () => ({
  charset: "utf-8",
  title: "Tw1ttr",
  viewport: "width=device-width,initial-scale=1"
});
var loader = async ({ request }) => {
  const cookie = getCookie(request);
  return await fetch(apiEndpoints.auth.me, composeRequestInit({ cookie }));
};
function App() {
  var _a;
  const transition = (0, import_react20.useTransition)();
  const isTransitioning = transition.state === "loading";
  let shouldScroll = true;
  const location = (0, import_react20.useLocation)();
  if ((location == null ? void 0 : location.state) && ((_a = location == null ? void 0 : location.state) == null ? void 0 : _a.disableScroll) === true) {
    shouldScroll = false;
  }
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en",
    className: "bg-[#f5f5f5] relative min-h-screen"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react20.Meta, null), /* @__PURE__ */ React.createElement(import_react20.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: "relative min-h-screen"
  }, /* @__PURE__ */ React.createElement(import_react20.Outlet, null), shouldScroll ? /* @__PURE__ */ React.createElement(import_react20.ScrollRestoration, null) : null, /* @__PURE__ */ React.createElement(import_react20.Scripts, null), /* @__PURE__ */ React.createElement(import_react20.LiveReload, null), isTransitioning && /* @__PURE__ */ React.createElement("div", {
    className: "fixed bottom-24 right-4 md:bottom-8 md:right-8"
  }, /* @__PURE__ */ React.createElement(SpinnerLoader, null))));
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell.tsx
var shell_exports = {};
__export(shell_exports, {
  default: () => AppShell
});
var import_react25 = require("@remix-run/react");

// app/modules/Shell/Navbar/components/LoggedInNavigation.tsx
var import_react23 = require("@remix-run/react");

// app/modules/Shell/Navbar/components/AvatarDropDown.tsx
var import_outline3 = require("@heroicons/react/outline");
var import_react_popover = require("@radix-ui/react-popover");
var import_react21 = require("@remix-run/react");
var import_clsx10 = __toESM(require("clsx"));
function AvatarDropDown({ user }) {
  var _a, _b;
  const fetcher = (0, import_react21.useFetcher)();
  const navigator = (0, import_react21.useNavigate)();
  return /* @__PURE__ */ React.createElement(import_react_popover.Root, null, /* @__PURE__ */ React.createElement(import_react_popover.Trigger, {
    className: "justify-end",
    asChild: true
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flex items-center px-5 py-2 border border-white rounded-lg hover:border-twitterBlue",
    "aria-label": "main menu"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-10 h-10 mr-3"
  }, ((_a = user == null ? void 0 : user.profile) == null ? void 0 : _a.avatarUrl) ? /* @__PURE__ */ React.createElement("img", {
    className: "object-cover w-full h-full rounded-lg",
    src: (_b = user == null ? void 0 : user.profile) == null ? void 0 : _b.avatarUrl,
    alt: "avatar"
  }) : /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-center w-full h-full text-3xl bg-opacity-50 rounded-lg bg-twitterBlue text-twitterBlue"
  }, "?")), /* @__PURE__ */ React.createElement("div", null, user.username), /* @__PURE__ */ React.createElement(import_outline3.ChevronDownIcon, {
    className: "w-5 h-5"
  }))), /* @__PURE__ */ React.createElement(import_react_popover.Content, {
    className: "w-56 p-3 mt-5 ml-auto text-sm bg-white border-2 shadow-sm rounded-xl border-grayHover animate-slideUpAndFade"
  }, /* @__PURE__ */ React.createElement(import_react_popover.Close, {
    onClick: () => navigator(links.profile(user.username)),
    className: buttonStyles
  }, /* @__PURE__ */ React.createElement(import_outline3.GlobeIcon, {
    className: "w-4 h-4 mr-2"
  }), "My Profile"), /* @__PURE__ */ React.createElement("div", {
    className: "h-[1px] my-3 bg-gray4"
  }), /* @__PURE__ */ React.createElement(import_react_popover.Close, {
    onClick: () => fetcher.submit({ actionType: "logout" }, { method: "post", action: "/logout" }),
    className: (0, import_clsx10.default)(buttonStyles, "text-red-900")
  }, /* @__PURE__ */ React.createElement(import_outline3.LogoutIcon, {
    className: "w-4 h-4 mr-2"
  }), "Logout")));
}
var buttonStyles = "w-full transition duration-200 flex items-center px-2 py-3 rounded-lg bg-grayHover hover:bg-gray4";

// app/modules/Shell/Navbar/components/NavigationLink.tsx
var import_react22 = require("@remix-run/react");
var import_clsx11 = __toESM(require("clsx"));
function NavigationLink({ restricted, to, label, className }) {
  const navigator = (0, import_react22.useNavigate)();
  const authGuard = useAuthGuard();
  if (restricted) {
    return /* @__PURE__ */ React.createElement("button", {
      className: ({ isActive }) => (0, import_clsx11.default)({ "text-twitterBlue": isActive }, className),
      onClick: () => {
        const user = authGuard();
        if (!user) {
          return null;
        }
        navigator(to);
      }
    }, label);
  }
  return /* @__PURE__ */ React.createElement(import_react22.NavLink, {
    className: ({ isActive }) => (0, import_clsx11.default)({ "text-twitterBlue": isActive }, className),
    to
  }, label);
}

// app/modules/Shell/Navbar/components/LoggedInNavigation.tsx
function LoggedInNavigation({ user }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "w-1/3"
  }, /* @__PURE__ */ React.createElement(import_react23.Link, {
    to: links.home,
    className: "text-2xl font-bold transition-colors text-twitterBlue hover:opacity-50"
  }, "Tw1ttr")), /* @__PURE__ */ React.createElement("nav", {
    className: "hidden w-1/3 md:block"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex justify-between text-twitterGrey "
  }, navLinks.map(({ label, to, restricted }) => /* @__PURE__ */ React.createElement(NavigationLink, {
    key: label,
    to,
    label,
    restricted
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-end w-1/3 cursor-pointer"
  }, /* @__PURE__ */ React.createElement(AvatarDropDown, {
    user
  })));
}
var navLinks = [
  { to: links.home, label: "Home" },
  { to: links.explore, label: "Explore" },
  { to: links.bookmarks, label: "Bookmarks", restricted: true }
];

// app/modules/Shell/Navbar/components/LoggedOutNavigation.tsx
function LoggedOutNavigation() {
  return /* @__PURE__ */ React.createElement("nav", {
    className: "md:block"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex justify-start text-twitterGrey "
  }, navLinks2.map(({ label, to }) => /* @__PURE__ */ React.createElement(NavigationLink, {
    className: "transition-colors hover:text-twitterBlue",
    key: label,
    to,
    label
  }))));
}
var navLinks2 = [{ to: links.login, label: "Sign In Or Register" }];

// app/modules/Shell/Navbar/Navbar.tsx
function NavBar({ children }) {
  const user = useOptionalUser();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", {
    className: "sticky top-0 z-50 p-5 text-lg font-light bg-white shadow-sm md:p-3 translate text-gray3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container flex items-center justify-between h-10 mx-auto md:h-20"
  }, user ? /* @__PURE__ */ React.createElement(LoggedInNavigation, {
    user
  }) : /* @__PURE__ */ React.createElement(LoggedOutNavigation, null))), children);
}

// app/modules/Shell/MobileFooter.tsx
var import_solid3 = require("@heroicons/react/solid");
var import_react24 = require("@remix-run/react");
var import_clsx12 = __toESM(require("clsx"));
function MobileFooter() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "fixed bottom-0 left-0 right-0 z-40 flex items-center h-20 bg-white shadow-[0px_-1px_2px_0px_#0000000d] md:hidden text-gray3 border-t-gray"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex justify-between w-full"
  }, mobileLinks.map(({ id, icon, to, restricted }) => /* @__PURE__ */ React.createElement(MobileLink, {
    key: id,
    Icon: icon,
    to,
    restricted
  }))));
}
var MobileLink = ({
  Icon,
  to,
  restricted
}) => {
  const authGuard = useAuthGuard();
  return /* @__PURE__ */ React.createElement(import_react24.NavLink, {
    className: ({ isActive }) => (0, import_clsx12.default)(isActive && "text-twitterBlue", "w-1/3 py-2 mx-4 text-center rounded-lg hover:bg-grayHover"),
    to,
    onClick: (e) => {
      if (restricted) {
        const user = authGuard();
        if (!user) {
          e.preventDefault();
          return null;
        }
      }
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full"
  }, /* @__PURE__ */ React.createElement(Icon, {
    className: "mx-auto w-7 h-7"
  })));
};
var mobileLinks = [
  { id: 1, icon: import_solid3.HomeIcon, to: links.home },
  { id: 2, icon: import_solid3.EyeIcon, to: links.explore },
  { id: 3, icon: import_solid3.BookmarkIcon, to: links.bookmarks, restricted: true }
];

// app/modules/Shell/shell.server.ts
var import_node = require("@remix-run/node");
async function logoutMutation(cookie) {
  console.log("\u{1F680} ~ file: shell.server.ts ~ line 5 ~ logoutMutation ~ cookie", cookie);
  await fetch(apiEndpoints.auth.logout, composeRequestInit({ cookie, method: "POST" }));
  return (0, import_node.redirect)("/login");
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell.tsx
function AppShell() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(NavBar, null, /* @__PURE__ */ React.createElement(import_react25.Outlet, null)), /* @__PURE__ */ React.createElement(MobileFooter, null));
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/$username.tsx
var username_exports = {};
__export(username_exports, {
  action: () => action,
  default: () => ProfileRoute,
  loader: () => loader2
});
var import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/modules/Profile/Profile.tsx
var import_react29 = require("@remix-run/react");

// app/modules/Profile/components/ProfileBanner.tsx
var import_react26 = require("@remix-run/react");
function ProfileBanner({ profile }) {
  const authGuard = useAuthGuard();
  const fetcher = (0, import_react26.useFetcher)();
  const isFollowMutationLoading = fetcher.state !== "idle";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "relative h-64 bg-twitterBlue"
  }, profile.bannerUrl ? /* @__PURE__ */ React.createElement("img", {
    className: "object-cover object-center w-full h-full",
    src: profile.bannerUrl,
    alt: "profile banner"
  }) : /* @__PURE__ */ React.createElement("div", {
    className: "object-cover object-center w-full h-full"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "px-3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container relative flex justify-between p-6 mx-auto -mt-20 bg-white rounded-xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-between w-full md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative self-center flex-shrink-0 w-40 h-40 -mt-32 rounded-lg md:self-start"
  }, profile.avatarUrl ? /* @__PURE__ */ React.createElement("img", {
    className: "object-cover w-full h-full rounded-lg bg-twitterBlue",
    src: profile.avatarUrl,
    alt: "profile avatar"
  }) : /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-center w-full h-full text-6xl font-light transition-colors rounded-lg bg-gray4 text-twitterBlue"
  }, "?")), /* @__PURE__ */ React.createElement("div", {
    className: "w-full text-center md:ml-10 md:text-left"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-center mt-5 mb-3 md:justify-start md:items-center md:mt-0 md:flex-row "
  }, /* @__PURE__ */ React.createElement("p", {
    className: "mt-5 text-2xl font-semibold md:mt-0 md:mr-6"
  }, profile.username), /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center"
  }, /* @__PURE__ */ React.createElement(import_react26.Link, {
    state: { disableScroll: true },
    replace: true,
    to: links.dialogs.following,
    className: "flex mr-5 transition-colors hover:text-twitterBlue"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "mr-1"
  }, profile.followeeCount), /* @__PURE__ */ React.createElement("p", null, "Following")), /* @__PURE__ */ React.createElement(import_react26.Link, {
    state: { disableScroll: true },
    replace: true,
    to: links.dialogs.followers,
    className: "flex transition-colors hover:text-twitterBlue"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "mr-1"
  }, profile.followerCount), /* @__PURE__ */ React.createElement("p", null, "Followers")))), /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "max-w-sm mx-auto mb-6 text-lg font-light text-center md:text-left md:mx-0 md:max-w-lg text-gray3"
  }, profile.bio))), /* @__PURE__ */ React.createElement(PrimaryButton, {
    disabled: isFollowMutationLoading,
    onClick: () => {
      const user = authGuard();
      if (!user) {
        return null;
      }
      fetcher.submit({ followeeId: profile.id.toString(), actionType: "follow" }, { method: "post" });
    }
  }, profile.isFollowing ? "Following" : "Follow")))));
}

// app/modules/Profile/components/UpdateProfileBanner.tsx
var import_outline4 = require("@heroicons/react/outline");
var import_react28 = require("@remix-run/react");
var import_clsx14 = __toESM(require("clsx"));
var import_framer_motion4 = require("framer-motion");

// app/modules/Profile/hooks/useUpdateProfile.ts
var import_react27 = require("react");
function useUpdateProfile({ defaults }) {
  const { bio } = defaults;
  const [profileForm, setUpdateForm] = (0, import_react27.useState)({
    bio,
    profileImage: null,
    errors: { username: null, bio: null }
  });
  const setProfileField = (e) => {
    setUpdateForm(__spreadProps(__spreadValues({}, profileForm), {
      [e.target.name]: e.target.value,
      errors: __spreadProps(__spreadValues({}, profileForm.errors), {
        [e.target.name]: validateUpdateProfile(e.target.name, e.target.value)
      })
    }));
  };
  return {
    profileForm,
    setProfileField,
    isFormValidated: !Object.values(profileForm.errors).some((x) => !!x)
  };
}
var validateUpdateProfile = (name, value) => {
  switch (name) {
    case "bio":
      return validateBio(value);
    default:
      break;
  }
};
var validateBio = (bio) => {
  if (typeof bio !== "string" || bio.length < 3) {
    return `Bio must be at least 3 characters long`;
  }
  if (bio.length > 50) {
    return `Bio must be less than 50 characters long`;
  }
};

// app/modules/Profile/components/ImageUploadButton.tsx
var import_solid4 = require("@heroicons/react/solid");
var import_clsx13 = __toESM(require("clsx"));
function ImageUploadButton({ onClick, loading = false, abort }) {
  return /* @__PURE__ */ React.createElement("button", {
    "aria-label": loading ? "Remove Image" : "Add Image",
    onClick: loading ? abort : onClick,
    className: "absolute flex items-center justify-center w-10 h-10 transition border border-white rounded-full shadow-2xl cursor-pointer bottom-2 left-2 bg-slate-300 hover:border-twitterBlue"
  }, /* @__PURE__ */ React.createElement("div", {
    className: (0, import_clsx13.default)("absolute border-t-2 rounded-full w-14 h-14 border-transparent animate-spin transition-colors pointer-events-none", loading && "!border-twitterBlue")
  }), loading ? /* @__PURE__ */ React.createElement("div", {
    className: "bg-[#0000008a] rounded-full absolute h-10 w-10 cursor-pointer grid place-content-center"
  }, /* @__PURE__ */ React.createElement(import_solid4.XCircleIcon, {
    className: "w-6 h-6 text-white"
  })) : /* @__PURE__ */ React.createElement(import_solid4.CameraIcon, {
    className: "w-5 h-5 text-slate-600"
  }));
}

// app/modules/Profile/components/UpdateProfileBanner.tsx
function UpdateProfileBanner({ profile }) {
  const fetcher = (0, import_react28.useFetcher)();
  const isSavingProfile = fetcher.state !== "idle";
  const { profileForm, setProfileField, isFormValidated } = useUpdateProfile({
    defaults: {
      bio: profile.bio
    }
  });
  const {
    images: bannerImage,
    loading: loadingBanner,
    dropzone: bannerUpload,
    errors: bannerError
  } = useImageUpload({ maxFiles: 1, multiple: false, overwrite: true });
  const {
    images: uploadedAvatarImage,
    loading: loadingProfile,
    dropzone: profileUpload,
    error: profileError
  } = useImageUpload({ maxFiles: 1, multiple: false, overwrite: true });
  const isUploadingImages = loadingBanner || loadingProfile;
  const hasProfileBeenUpdated = profileForm.bio !== profile.bio || (bannerImage == null ? void 0 : bannerImage.url) || (uploadedAvatarImage == null ? void 0 : uploadedAvatarImage.url);
  const isSubmissionDisabled = isUploadingImages || !isFormValidated;
  const avatarImage = (uploadedAvatarImage == null ? void 0 : uploadedAvatarImage.previewUrl) || profile.avatarUrl;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("input", __spreadValues({}, bannerUpload.getInputProps())), /* @__PURE__ */ React.createElement("input", __spreadValues({}, profileUpload.getInputProps())), /* @__PURE__ */ React.createElement(import_framer_motion4.AnimatePresence, null, /* @__PURE__ */ React.createElement("div", {
    className: "relative h-64 bg-twitterBlue"
  }, (bannerImage == null ? void 0 : bannerImage.previewUrl) || profile.bannerUrl ? /* @__PURE__ */ React.createElement("img", {
    className: "object-cover object-center w-full h-full",
    src: (bannerImage == null ? void 0 : bannerImage.previewUrl) || profile.bannerUrl,
    alt: "profile banner"
  }) : /* @__PURE__ */ React.createElement("div", {
    className: "object-cover object-center w-full h-full"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute w-5 h-5 rounded-md bottom-[50%] left-[50%] translate-x-1/2"
  }, /* @__PURE__ */ React.createElement(ImageUploadButton, {
    onClick: bannerUpload.open,
    abort: bannerImage == null ? void 0 : bannerImage.abortUpload,
    loading: bannerImage == null ? void 0 : bannerImage.uploading
  }), bannerError ? /* @__PURE__ */ React.createElement("p", {
    className: "mt-10 text-sm text-red-700"
  }, bannerError) : null)), /* @__PURE__ */ React.createElement("div", {
    className: "px-3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container relative flex justify-between p-6 mx-auto -mt-20 bg-white rounded-xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-between w-full md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative self-center flex-shrink-0 w-40 h-40 -mt-32 rounded-lg md:self-start"
  }, avatarImage ? /* @__PURE__ */ React.createElement("img", {
    className: "object-cover w-full h-full rounded-lg bg-twitterBlue",
    src: avatarImage,
    alt: "profile avatar"
  }) : /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-center w-full h-full text-6xl font-light transition-colors rounded-lg bg-gray4 text-twitterBlue"
  }, "?"), /* @__PURE__ */ React.createElement(ImageUploadButton, {
    onClick: profileUpload.open,
    abort: uploadedAvatarImage == null ? void 0 : uploadedAvatarImage.abortUpload,
    loading: uploadedAvatarImage == null ? void 0 : uploadedAvatarImage.uploading
  }), profileError && /* @__PURE__ */ React.createElement(Fade, {
    className: "mt-2 text-sm text-red-700"
  }, profileError)), /* @__PURE__ */ React.createElement("div", {
    className: "w-full text-center md:ml-10 md:text-left"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-center mt-5 mb-3 md:justify-start md:items-center md:mt-0 md:flex-row "
  }, /* @__PURE__ */ React.createElement("p", {
    className: "p-1 mt-5 text-2xl font-semibold md:mt-0 md:mr-6"
  }, profile.username), /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center"
  }, /* @__PURE__ */ React.createElement(import_react28.Link, {
    to: links.dialogs.following,
    className: "flex mr-5 transition-colors hover:text-twitterBlue"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "mr-1"
  }, profile.followeeCount), /* @__PURE__ */ React.createElement("p", null, "Following")), /* @__PURE__ */ React.createElement(import_react28.Link, {
    to: links.dialogs.followers,
    className: "flex transition-colors hover:text-twitterBlue"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "mr-1"
  }, profile.followerCount), /* @__PURE__ */ React.createElement("p", null, "Followers")))), /* @__PURE__ */ React.createElement("div", {
    className: "flex md:items-center"
  }, /* @__PURE__ */ React.createElement("label", {
    className: "hidden cursor-pointer md:block",
    htmlFor: "bio"
  }, /* @__PURE__ */ React.createElement(import_outline4.PencilAltIcon, {
    className: "w-5 h-5 mr-2"
  })), /* @__PURE__ */ React.createElement("input", {
    id: "bio",
    "aria-label": "update your bio",
    value: profileForm.bio,
    name: "bio",
    placeholder: "Add a bio...",
    onChange: setProfileField,
    className: "w-2/3 p-1 mx-auto text-lg font-light text-center md:text-left md:mx-0 text-gray3"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "h-3 mt-3 text-xs text-red-700"
  }, profileForm.errors.bio ? /* @__PURE__ */ React.createElement(import_framer_motion4.motion.p, {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }, profileForm.errors.bio) : "")), hasProfileBeenUpdated ? /* @__PURE__ */ React.createElement(Fade, {
    className: "flex items-center justify-center w-full mt-5 md:mt-0 md:w-36 text-twitterBlue"
  }, /* @__PURE__ */ React.createElement("button", {
    className: (0, import_clsx14.default)(isSubmissionDisabled && "opacity-50 cursor-auto", `transition-colors flex items-center justify-center cursor-pointer   text-twitterBlue`),
    disabled: isSubmissionDisabled,
    onClick: () => {
      fetcher.submit(__spreadValues(__spreadValues({
        actionType: "updateProfile",
        bio: profileForm.bio
      }, (bannerImage == null ? void 0 : bannerImage.url) && { bannerUrl: bannerImage == null ? void 0 : bannerImage.url }), (uploadedAvatarImage == null ? void 0 : uploadedAvatarImage.url) && { avatarUrl: uploadedAvatarImage == null ? void 0 : uploadedAvatarImage.url }), { method: "post" });
    }
  }, isSavingProfile ? /* @__PURE__ */ React.createElement(BounceLoader, null) : "Save Profile Updates")) : /* @__PURE__ */ React.createElement("div", {
    className: "w-36"
  }))))));
}

// app/modules/Profile/Profile.tsx
function Profile() {
  const { profile, tweets } = (0, import_react29.useLoaderData)();
  console.log("\u{1F680} ~ file: Profile.tsx ~ line 15 ~ Profile ~ profile", profile);
  const user = useOptionalUser();
  const isViewingOwnProfile = (user == null ? void 0 : user.username) === (profile == null ? void 0 : profile.username);
  return /* @__PURE__ */ React.createElement("div", {
    className: "relative font-poppins"
  }, isViewingOwnProfile ? /* @__PURE__ */ React.createElement(UpdateProfileBanner, {
    profile
  }) : /* @__PURE__ */ React.createElement(ProfileBanner, {
    profile
  }), /* @__PURE__ */ React.createElement(PrimaryLayoutContainer, null, /* @__PURE__ */ React.createElement(AsideMenu, {
    ariaLabel: "filter tweets",
    items: asideMenuItems
  }), /* @__PURE__ */ React.createElement("main", {
    className: "self-start h-full -mt-10"
  }, /* @__PURE__ */ React.createElement(TweetList, {
    tweets,
    variant: "profile"
  }))), /* @__PURE__ */ React.createElement(import_react29.Outlet, null));
}
var asideMenuItems = [
  { description: "Tweet", url: "test" },
  { description: "Tweets & replies", url: "test" },
  { description: "Media", url: "test" },
  { description: "Likes", url: "test" }
];

// app/modules/Profile/profile.server.ts
async function getProfileTweetsQuery(username, cookie) {
  return await fetchRequest(apiEndpoints.tweets.getProfileTweets(username), { cookie });
}
async function getFollowers(username, cookie) {
  return await fetch(apiEndpoints.follows.getFollowers(username), composeRequestInit({ cookie }));
}
async function getFollowees(username, cookie) {
  return await fetch(apiEndpoints.follows.getFollowees(username), composeRequestInit({ cookie }));
}
async function updateProfile(cookie, body) {
  return await fetch(apiEndpoints.profile.update, composeRequestInit({ cookie, method: "PATCH", body }));
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/$username.tsx
var action = async ({ request }) => {
  const _a = await unpackRequest(request), { cookie, actionType, tweetId, followeeId } = _a, data = __objRest(_a, ["cookie", "actionType", "tweetId", "followeeId"]);
  switch (actionType) {
    case "follow":
      return await followMutation(followeeId, cookie);
    case "like":
      return await likeTweetMutation(tweetId, cookie);
    case "retweet":
      return await retweetMutation(tweetId, cookie);
    case "save":
      return await saveTweetMutation(tweetId, cookie);
    case "updateProfile":
      return await updateProfile(cookie, data);
    default:
      break;
  }
};
var loader2 = async ({ request, params }) => {
  const cookie = getCookie(request);
  const username = params.username;
  (0, import_tiny_invariant.default)(username, `params.username is required`);
  return await getProfileTweetsQuery(username, cookie);
};
function ProfileRoute() {
  return /* @__PURE__ */ React.createElement(Profile, null);
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/$username/followers.tsx
var followers_exports = {};
__export(followers_exports, {
  default: () => Followers,
  loader: () => loader3
});
var import_react32 = require("@remix-run/react");
var import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/modules/shared/UserDialog/UserDialog.tsx
var import_react_dialog = require("@radix-ui/react-dialog");
var import_react31 = require("@remix-run/react");

// app/modules/shared/UserDialog/components/UserCard.tsx
var import_react30 = require("@remix-run/react");
function UserCard({ user }) {
  const authGuard = useAuthGuard();
  const fetcher = (0, import_react30.useFetcher)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "py-5 bg-white border-t border-b border-gray4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-start"
  }, /* @__PURE__ */ React.createElement(UserAvatar, {
    username: user.username,
    avatarUrl: user.avatarUrl
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-between mr-3"
  }, /* @__PURE__ */ React.createElement(import_react30.Link, {
    className: "transition-colors hover:text-twitterBlue",
    to: "/" + user.username
  }, user.username), /* @__PURE__ */ React.createElement("div", null, user.followerCount, " followers")))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-5"
  }, user.bio));
}

// app/modules/shared/UserDialog/components/UserCardList.tsx
function UserCardList({ users }) {
  if (!users || users.length === 0) {
    return /* @__PURE__ */ React.createElement("p", {
      className: "mx-auto"
    }, "Nothing to show");
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, users == null ? void 0 : users.map((user) => /* @__PURE__ */ React.createElement(UserCard, {
    key: user.id,
    user
  })));
}

// app/modules/shared/UserDialog/UserDialog.tsx
function UserDialog({ username = "", variant, users }) {
  console.log("\u{1F680} ~ file: UserDialog.tsx ~ line 15 ~ UserDialog ~ users", users);
  const navigator = (0, import_react31.useNavigate)();
  return /* @__PURE__ */ React.createElement(import_react_dialog.Root, {
    defaultOpen: true,
    onOpenChange: () => navigator("..", { replace: true, state: { disableScroll: true } })
  }, /* @__PURE__ */ React.createElement(import_react_dialog.Portal, null, /* @__PURE__ */ React.createElement(import_react_dialog.Content, {
    className: "flex items-center justify-center "
  }, /* @__PURE__ */ React.createElement("div", {
    className: "fixed flex flex-col w-full max-w-md p-5 mx-auto transform -translate-x-1/2 -translate-y-1/2 bg-transparent md:max-w-3xl lg:max-w-4xl sm:rounded-3xl left-1/2 top-1/2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "p-5 bg-white border-2 rounded-lg shadow-md border-twitterBlue animate-fade"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center justify-between mb-5 text-twitterBlue"
  }, /* @__PURE__ */ React.createElement("div", null, composeDialogTitle(variant, username)), /* @__PURE__ */ React.createElement(import_react_dialog.Close, {
    className: "flex flex-col items-center justify-center text-gray-100 duration-200 bg-gray-900 bg-opacity-50 outline-none cursor-pointer hover:bg-opacity-100 lg:bg-transparent lg:hover:opacity-30"
  }, "Close")), /* @__PURE__ */ React.createElement(UserCardList, {
    users
  }))))));
}
function composeDialogTitle(variant, username) {
  return {
    retweets: `Retweeted By:`,
    likes: "Liked By:",
    saves: "Saved by:",
    followers: `${username} is followed by:`,
    following: `${username} is following:`
  }[variant];
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/$username/followers.tsx
var loader3 = async ({ request, params }) => {
  const cookie = getCookie(request);
  const username = params.username;
  (0, import_tiny_invariant2.default)(username, `params.username is required`);
  return await getFollowers(username, cookie);
};
function Followers() {
  const followers = (0, import_react32.useLoaderData)();
  const { username } = (0, import_react32.useParams)();
  (0, import_tiny_invariant2.default)(username, `params.username is required`);
  return /* @__PURE__ */ React.createElement(UserDialog, {
    username,
    variant: "followers",
    users: followers
  });
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/$username/following.tsx
var following_exports = {};
__export(following_exports, {
  default: () => Following,
  loader: () => loader4
});
var import_react33 = require("@remix-run/react");
var import_tiny_invariant3 = __toESM(require("tiny-invariant"));
var loader4 = async ({ request, params }) => {
  const cookie = getCookie(request);
  const username = params.username;
  (0, import_tiny_invariant3.default)(username, `params.username is required`);
  return await getFollowees(username, cookie);
};
function Following() {
  const users = (0, import_react33.useLoaderData)();
  const { username } = (0, import_react33.useParams)();
  (0, import_tiny_invariant3.default)(username, `params.username is required`);
  return /* @__PURE__ */ React.createElement(UserDialog, {
    username,
    variant: "following",
    users
  });
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/bookmarks.tsx
var bookmarks_exports = {};
__export(bookmarks_exports, {
  action: () => action2,
  default: () => BookmarkRoute,
  loader: () => loader5
});

// app/modules/Bookmarks/Bookmarks.tsx
var import_react34 = require("@remix-run/react");
function Bookmarks() {
  const tweets = (0, import_react34.useLoaderData)();
  return /* @__PURE__ */ React.createElement(PrimaryLayoutContainer, null, /* @__PURE__ */ React.createElement(AsideMenu, {
    ariaLabel: "filter tweets",
    items: asideMenuItems2
  }), /* @__PURE__ */ React.createElement("main", {
    className: "self-start h-full -mt-10"
  }, /* @__PURE__ */ React.createElement(TweetList, {
    tweets
  })));
}
var asideMenuItems2 = [
  { description: "Tweet", url: "test" },
  { description: "Tweets & replies", url: "test" },
  { description: "Media", url: "test" },
  { description: "Likes", url: "test" }
];

// app/modules/Bookmarks/bookmarks.server.ts
async function bookmarkTweetsQuery(cookie) {
  return await fetch(apiEndpoints.saves.getBookmarks, composeRequestInit({ cookie }));
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/bookmarks.tsx
var action2 = async ({ request }) => {
  const { cookie, actionType, tweetId } = await unpackRequest(request);
  switch (actionType) {
    case "like":
      return await likeTweetMutation(tweetId, cookie);
    case "retweet":
      return await retweetMutation(tweetId, cookie);
    case "save":
      return await saveTweetMutation(tweetId, cookie);
    default:
      break;
  }
};
var loader5 = async ({ request }) => {
  const cookie = getCookie(request);
  return await bookmarkTweetsQuery(cookie);
};
function BookmarkRoute() {
  return /* @__PURE__ */ React.createElement(Bookmarks, null);
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/tweet/$id.tsx
var id_exports = {};
__export(id_exports, {
  action: () => action3,
  default: () => TweetRoute,
  loader: () => loader6
});

// app/modules/Tweet/Tweet.tsx
var import_react35 = require("@remix-run/react");

// app/modules/Tweet/components/TrendsForYou.tsx
function TrendsForYou() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "hidden p-5 bg-white rounded-lg shadow-sm md:block"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-sm border-b border-[#E0E0E0] h-10"
  }, "Trends For You")));
}

// app/modules/Tweet/components/TweetContainer.tsx
function TweetContainer({ children }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid md:grid-cols-[3fr,1fr] gap-5 container px-5 mx-auto"
  }, children);
}

// app/modules/Tweet/Tweet.tsx
var import_react36 = require("@remix-run/react");
function Tweet() {
  const { tweet, comments } = (0, import_react35.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(BackArrow, null), /* @__PURE__ */ React.createElement(TweetContainer, null, /* @__PURE__ */ React.createElement(TweetCard, {
    comments,
    tweet,
    variant: "open",
    idx: 0
  }), /* @__PURE__ */ React.createElement(TrendsForYou, null)), /* @__PURE__ */ React.createElement(import_react36.Outlet, null));
}

// app/modules/Tweet/tweet.server.ts
var import_node2 = require("@remix-run/node");
async function commentMutation(tweetId, cookie, body) {
  return await fetch(apiEndpoints.comments.comment(tweetId), composeRequestInit({ cookie, body, method: "POST" }));
}
async function likeCommentMutation(commentId, cookie) {
  return await fetch(apiEndpoints.comments.likeComment(commentId), composeRequestInit({ cookie, method: "POST" }));
}
async function getTweetById(tweetId, cookie) {
  const data = await fetch(apiEndpoints.tweets.getTweetById(tweetId), composeRequestInit({ cookie }));
  const result = await data.json();
  return (0, import_node2.json)(result, {
    headers: {
      "Cache-Control": "public, max-age=120"
    }
  });
}
async function getSaversForTweet(tweetId, cookie) {
  return await fetch(apiEndpoints.saves.getSaversForTweet(tweetId), composeRequestInit({ cookie }));
}
async function getLikersForTweet(tweetId, cookie) {
  return await fetch(apiEndpoints.likes.getLikersForTweet(tweetId), composeRequestInit({ cookie }));
}
async function getRetweetersForTweet(tweetId, cookie) {
  return await fetch(apiEndpoints.retweets.getRetweetersForTweet(tweetId), composeRequestInit({ cookie }));
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/tweet/$id.tsx
var loader6 = async ({ request, params }) => {
  const cookie = getCookie(request);
  return await getTweetById(params.id, cookie);
};
var action3 = async ({ request }) => {
  const _a = await unpackRequest(request), { actionType, tweetId, commentId, followeeId, cookie } = _a, data = __objRest(_a, ["actionType", "tweetId", "commentId", "followeeId", "cookie"]);
  switch (actionType) {
    case "follow":
      return await followMutation(followeeId, cookie);
    case "like":
      return await likeTweetMutation(tweetId, cookie);
    case "retweet":
      return await retweetMutation(tweetId, cookie);
    case "save":
      return await saveTweetMutation(tweetId, cookie);
    case "comment":
      return await commentMutation(tweetId, cookie, data);
    case "likeComment":
      return await likeCommentMutation(commentId, cookie);
    default:
      break;
  }
};
function TweetRoute() {
  return /* @__PURE__ */ React.createElement(Tweet, null);
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/tweet/$id/retweets.tsx
var retweets_exports = {};
__export(retweets_exports, {
  default: () => RetweetsDialog,
  loader: () => loader7
});
var import_react37 = require("@remix-run/react");
var import_tiny_invariant4 = __toESM(require("tiny-invariant"));
var loader7 = async ({ request, params }) => {
  const cookie = getCookie(request);
  const tweetId = params.id;
  (0, import_tiny_invariant4.default)(tweetId, `params.slug is required`);
  return await getRetweetersForTweet(tweetId, cookie);
};
function RetweetsDialog() {
  const retweets = (0, import_react37.useLoaderData)();
  return /* @__PURE__ */ React.createElement(UserDialog, {
    variant: "retweets",
    users: retweets
  });
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/tweet/$id/likes.tsx
var likes_exports = {};
__export(likes_exports, {
  default: () => LikesDialog,
  loader: () => loader8
});
var import_react38 = require("@remix-run/react");
var import_tiny_invariant5 = __toESM(require("tiny-invariant"));
var loader8 = async ({ request, params }) => {
  const cookie = getCookie(request);
  const tweetId = params.id;
  (0, import_tiny_invariant5.default)(tweetId, `params.slug is required`);
  return await getLikersForTweet(tweetId, cookie);
};
function LikesDialog() {
  const likes = (0, import_react38.useLoaderData)();
  return /* @__PURE__ */ React.createElement(UserDialog, {
    variant: "likes",
    users: likes
  });
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/tweet/$id/saves.tsx
var saves_exports = {};
__export(saves_exports, {
  default: () => SavesDialog,
  loader: () => loader9
});
var import_react39 = require("@remix-run/react");
var import_tiny_invariant6 = __toESM(require("tiny-invariant"));
var loader9 = async ({ request, params }) => {
  const cookie = getCookie(request);
  const tweetId = params.id;
  (0, import_tiny_invariant6.default)(tweetId, `params.slug is required`);
  return await getSaversForTweet(tweetId, cookie);
};
function SavesDialog() {
  const saves = (0, import_react39.useLoaderData)();
  return /* @__PURE__ */ React.createElement(UserDialog, {
    variant: "saves",
    users: saves
  });
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/explore.tsx
var explore_exports = {};
__export(explore_exports, {
  default: () => ExploreRoute
});

// app/modules/Explore/Explore.tsx
var import_solid5 = require("@heroicons/react/solid");
var import_react_textarea_autosize2 = __toESM(require("react-textarea-autosize"));
function Explore() {
  return /* @__PURE__ */ React.createElement(PrimaryLayoutContainer, null, /* @__PURE__ */ React.createElement(AsideMenu, {
    ariaLabel: "filter tweets by categories",
    items: asideMenuItems3
  }), /* @__PURE__ */ React.createElement("main", {
    className: "self-start order-1 md:order-2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-between px-3 py-2 bg-white rounded-lg shadow-sm"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center w-full"
  }, /* @__PURE__ */ React.createElement(import_solid5.SearchIcon, {
    className: "w-5 h-5 text-gray3"
  }), /* @__PURE__ */ React.createElement(import_react_textarea_autosize2.default, {
    className: "w-full p-2 mx-3 resize-none",
    placeholder: "Search"
  })), /* @__PURE__ */ React.createElement(PrimaryButton, null, "Search")), /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center mt-5 text-twitterBlue"
  }, "This feature hasn't been built yet.")));
}
var asideMenuItems3 = [
  { description: "Tweet", url: "test" },
  { description: "Tweets & replies", url: "test" },
  { description: "Media", url: "test" },
  { description: "Likes", url: "test" }
];

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/explore.tsx
function ExploreRoute() {
  return /* @__PURE__ */ React.createElement(Explore, null);
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action4
});
var action4 = async ({ request }) => {
  const cookie = getCookie(request);
  return await logoutMutation(cookie);
};

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/index.tsx
var shell_exports2 = {};
__export(shell_exports2, {
  default: () => IndexRoute,
  loader: () => loader10
});
var import_node3 = require("@remix-run/node");
var loader10 = async () => {
  return (0, import_node3.redirect)("/feed");
};
function IndexRoute() {
  return null;
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/feed.tsx
var feed_exports = {};
__export(feed_exports, {
  action: () => action5,
  default: () => HomeRoute,
  loader: () => loader11
});

// app/modules/Feed/Feed.tsx
var import_react42 = require("@remix-run/react");
var import_react43 = require("@remix-run/react");

// app/modules/Feed/components/TrendsForYou.tsx
function TrendsForYou2() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", {
    className: "hidden p-5 bg-white rounded-lg shadow-sm md:block"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-sm border-b border-[#E0E0E0] h-10"
  }, "Trends For You")));
}

// app/modules/Feed/components/TweetSomething/TweetSomethings.tsx
var import_react41 = require("@remix-run/react");
var import_clsx18 = __toESM(require("clsx"));
var import_react_textarea_autosize3 = __toESM(require("react-textarea-autosize"));

// app/modules/Feed/components/TweetSomething/components/TweetSomethingButtonGroup/TweetSomethingButtonGroup.tsx
var import_solid6 = require("@heroicons/react/solid");
var import_clsx16 = __toESM(require("clsx"));

// app/modules/Feed/components/TweetSomething/components/TweetSomethingButtonGroup/PermissionsPopup.tsx
var import_outline5 = require("@heroicons/react/outline");
var import_react_popover2 = require("@radix-ui/react-popover");
var import_clsx15 = __toESM(require("clsx"));
var FOLLOWERS = "FOLLOWERS";
var EVERYONE = "EVERYONE";
function PermissionsPopup({
  setReplyPermissions,
  replyPermissions
}) {
  const isEveryone = replyPermissions === EVERYONE;
  const isFollowers = replyPermissions === FOLLOWERS;
  const ActiveIcon = isEveryone ? import_outline5.GlobeIcon : import_outline5.UserGroupIcon;
  return /* @__PURE__ */ React.createElement(import_react_popover2.Root, null, /* @__PURE__ */ React.createElement(import_react_popover2.Trigger, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-between"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center group"
  }, /* @__PURE__ */ React.createElement(ActiveIcon, {
    className: "inline mr-2 cursor-pointer h-7 text-twitterBlue group-hover:text-blue-800"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "hidden text-twitterBlue group-hover:text-blue-800 md:block"
  }, isEveryone ? "Everyone can reply" : "Followers can only reply")))), /* @__PURE__ */ React.createElement(import_react_popover2.Content, {
    className: "p-3 mt-10 bg-white border-2 shadow-sm rounded-xl border-grayHover animate-slideUpAndFade"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "font-medium font-poppins"
  }, "Who can reply?"), /* @__PURE__ */ React.createElement("p", {
    className: "font-light text text-gray3"
  }, "Choose who can reply to this Tweet."), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col mt-2"
  }, /* @__PURE__ */ React.createElement(CloseButton, {
    type: isEveryone,
    Icon: import_outline5.GlobeIcon,
    label: "Everyone",
    onClick: () => setReplyPermissions(EVERYONE)
  }), /* @__PURE__ */ React.createElement(CloseButton, {
    type: isFollowers,
    Icon: import_outline5.UserGroupIcon,
    label: "People You Follow",
    onClick: () => setReplyPermissions(FOLLOWERS)
  }))));
}
var CloseButton = ({
  type,
  Icon,
  label,
  onClick
}) => {
  return /* @__PURE__ */ React.createElement(import_react_popover2.Close, {
    "aria-pressed": type,
    className: (0, import_clsx15.default)("flex px-2 py-4 mb-1 rounded-lg hover:bg-grayHover item-center", type && "bg-gray4 hover:bg-gray4"),
    onClick
  }, /* @__PURE__ */ React.createElement(Icon, {
    className: "w-6 h-6 mr-2"
  }), label);
};

// app/modules/Feed/components/TweetSomething/components/TweetSomethingButtonGroup/TweetSomethingButtonGroup.tsx
function TweetSomethingButtonGroup({
  openImagePicker,
  setReplyPermissions,
  replyPermissions,
  tweetCharacterCount,
  isFetching,
  isUploadingImages
}) {
  const authGuard = useAuthGuard();
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex items-end justify-between"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-end"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: () => {
      const user = authGuard();
      if (!user) {
        return null;
      }
      openImagePicker();
    }
  }, /* @__PURE__ */ React.createElement(import_solid6.PhotographIcon, {
    className: "mr-5 cursor-pointer h-7 text-twitterBlue hover:text-blue-800"
  })), /* @__PURE__ */ React.createElement(PermissionsPopup, {
    setReplyPermissions,
    replyPermissions
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-end"
  }, /* @__PURE__ */ React.createElement("div", {
    className: (0, import_clsx16.default)("mr-5 hidden md:block", tweetCharacterCountStyling(tweetCharacterCount))
  }, tweetCharacterCount, " / 50"), /* @__PURE__ */ React.createElement(PrimaryButton, {
    disabled: isUploadingImages || tweetCharacterCount === 0,
    type: "submit",
    loading: isFetching,
    className: "h-10 w-[99px]"
  }, "Tweet")));
}
var tweetCharacterCountStyling = (count) => {
  if (count === 50) {
    return "text-red-700";
  }
  if (count >= 40) {
    return "text-orange-600";
  }
  if (count >= 30) {
    return "text-orange-500";
  }
  if (count >= 15) {
    return "text-green-600";
  }
  if (count < 15) {
    return "text-green-700";
  }
};

// app/modules/Feed/components/TweetSomething/components/TweetSomethingImagePreviews.tsx
var import_solid7 = require("@heroicons/react/solid");
var import_clsx17 = __toESM(require("clsx"));
function TweetSomethingImagePreviews({ images }) {
  if (images.length < 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex mb-5 max-h-64 max-w-96"
  }, images.map(({ id, previewUrl, abortUpload, uploading }) => {
    return /* @__PURE__ */ React.createElement("div", {
      className: "relative",
      key: id
    }, /* @__PURE__ */ React.createElement("img", {
      className: "object-cover mr-5 rounded-lg max-w-64 max-h-64",
      src: previewUrl,
      alt: "images to add to tweet"
    }), /* @__PURE__ */ React.createElement("button", {
      type: "button",
      "aria-label": "Remove image",
      className: "bg-[#0000008a] rounded-full absolute h-10 w-10 top-5 left-5 cursor-pointer grid place-content-center",
      onClick: abortUpload
    }, /* @__PURE__ */ React.createElement(import_solid7.XCircleIcon, {
      className: "w-6 h-6 text-white"
    })), /* @__PURE__ */ React.createElement("div", {
      className: (0, import_clsx17.default)("absolute border-t-2 rounded-full w-14 h-14 top-3 left-3  border-transparent animate-spin transition-colors pointer-events-none", uploading && "!border-twitterBlue")
    }));
  }));
}

// app/modules/Feed/components/TweetSomething/hooks/useResetTweet.ts
var import_react40 = require("react");
function useResetTweet(fetcher, clearContent, clearImages) {
  const submittedTweet = fetcher.type === "done";
  const tweetContentRef = (0, import_react40.useRef)(null);
  (0, import_react40.useEffect)(() => {
    if (submittedTweet) {
      tweetContentRef.current.blur();
      clearContent();
      clearImages();
    }
  }, [submittedTweet]);
  return tweetContentRef;
}

// app/modules/Feed/components/TweetSomething/hooks/useTweetSomethingForm.ts
var import_react_use2 = require("react-use");
function useTweetSomethingForm() {
  const [tweetSomethingFormData, actions] = (0, import_react_use2.useMethods)(tweetSomethingReducer, {
    content: "",
    replyPermissions: "EVERYONE",
    errors: { content: "" }
  });
  const tweetCharacterCount = tweetSomethingFormData.content.length;
  function setContent(value) {
    if (tweetCharacterCount === 50) {
      return null;
    }
    actions.setContent({
      content: value,
      errors: {
        content: validateContent(value)
      }
    });
  }
  function backspaceContent(key) {
    if (key === "Backspace" && tweetCharacterCount === 50) {
      actions.setContent({
        content: tweetSomethingFormData.content.slice(0, -1)
      });
    }
  }
  function clearContent() {
    actions.setContent({
      content: "",
      errors: {
        content: ""
      }
    });
  }
  function setReplyPermissions(value) {
    actions.setReplyPermissions(value);
  }
  return {
    tweetSomethingFormData,
    setContent,
    clearContent,
    setReplyPermissions,
    backspaceContent
  };
}
function tweetSomethingReducer(state) {
  return {
    setReplyPermissions(replyPermissions) {
      return __spreadProps(__spreadValues({}, state), { replyPermissions });
    },
    setContent({ content, errors }) {
      return __spreadProps(__spreadValues({}, state), {
        content,
        errors: __spreadValues(__spreadValues({}, state.errors), errors)
      });
    }
  };
}
function validateContent(content) {
  if (typeof content !== "string" || content.length < 3) {
    return `Content must be at least 3 characters long`;
  }
  if (content.length > 50) {
    return `Content must be less than 50 characters long`;
  }
}

// app/modules/Feed/components/TweetSomething/TweetSomethings.tsx
function TweetSomething({ user }) {
  var _a;
  console.log("\u{1F680} ~ file: TweetSomethings.tsx ~ line 12 ~ TweetSomething ~ user", user);
  const fetcher = (0, import_react41.useFetcher)();
  const {
    images,
    clearImages,
    dropzone,
    loading: uploadingImages,
    errors
  } = useImageUpload({ maxFiles: 3 });
  const authGuard = useAuthGuard({ redirect: true });
  const {
    tweetSomethingFormData: { content, replyPermissions },
    setContent,
    clearContent,
    setReplyPermissions,
    backspaceContent
  } = useTweetSomethingForm();
  const tweetContentRef = useResetTweet(fetcher, clearContent, clearImages);
  const isFetching = fetcher.state !== "idle";
  const tweetCharacterCount = content.length;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isFetching) {
      return null;
    }
    const user2 = authGuard();
    if (!user2) {
      return;
    }
    const imageIds = images.map(({ url }) => url);
    fetcher.submit(__spreadProps(__spreadValues({
      content,
      replyPermissions
    }, (imageIds == null ? void 0 : imageIds.length) > 0 && { imageIds }), {
      actionType: "create"
    }), { method: "post" });
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "self-start p-5 bg-white shadow-sm b rounded-2xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "h-8 border-b border-[#f2f2f2] mb-3"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "md:text-md text-sm  leading-5 text-[#4F4F4F]"
  }, "Tweet Something")), /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement(import_react41.Link, {
    to: user ? user.username : "/login",
    className: "relative w-10 h-10 md:w-14 md:h-14"
  }, /* @__PURE__ */ React.createElement(UserAvatar, {
    avatarUrl: (_a = user == null ? void 0 : user.profile) == null ? void 0 : _a.avatarUrl,
    username: user.username
  })), /* @__PURE__ */ React.createElement("form", {
    className: "w-full ml-3 md:ml-5 sm:mt-0 md:mt-4",
    onSubmit
  }, /* @__PURE__ */ React.createElement("div", __spreadValues({
    className: `border border-dashed border-white ${dropzone.isDragActive ? "border-gray3" : ""}`
  }, dropzone.getRootProps()), /* @__PURE__ */ React.createElement("input", __spreadValues({}, dropzone.getInputProps())), /* @__PURE__ */ React.createElement(import_react_textarea_autosize3.default, {
    className: (0, import_clsx18.default)("w-full h-24 pb-12 text-md md:text-lg font-light outline-none resize-none placeholder:md:text-lg placeholder-gray4", isFetching && "opacity-50 cursor-auto"),
    placeholder: "What\u2019s happening?",
    name: "content",
    value: content,
    onChange: (e) => setContent(e.target.value),
    onKeyDown: (e) => backspaceContent(e.key),
    ref: tweetContentRef,
    disabled: isFetching
  }), /* @__PURE__ */ React.createElement(TweetSomethingImagePreviews, {
    images
  })), errors ? /* @__PURE__ */ React.createElement("p", {
    className: "text-red-700"
  }, errors) : null, /* @__PURE__ */ React.createElement(TweetSomethingButtonGroup, {
    tweetCharacterCount,
    openImagePicker: dropzone.open,
    setReplyPermissions,
    replyPermissions,
    isFetching,
    isUploadingImages: uploadingImages
  }))));
}

// app/modules/Feed/Feed.tsx
function Home() {
  const tweets = (0, import_react43.useLoaderData)();
  const user = useOptionalUser();
  return /* @__PURE__ */ React.createElement("div", {
    className: "grid md:grid-cols-[3fr,1fr] gap-5 container p-5 mt-10 mx-auto md:p-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "self-start"
  }, /* @__PURE__ */ React.createElement(TweetSomething, {
    user
  }), /* @__PURE__ */ React.createElement(TweetList, {
    tweets
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center py-10 text-red-500"
  }, "No infinite scroll until this is added:", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/remix-run/remix/discussions/2775"
  }, "https://github.com/remix-run/remix/discussions/2775"))), /* @__PURE__ */ React.createElement(TrendsForYou2, null), /* @__PURE__ */ React.createElement(import_react42.Outlet, null));
}

// app/modules/Feed/feed.server.ts
async function createTweetMutation(cookie, {
  content,
  replyPermissions,
  imageIds
}) {
  const imageUrls = imageIds ? imageIds.split(",") : null;
  return await fetch(apiEndpoints.tweets.createTweet, composeRequestInit({
    body: { content, imageUrls, replyPermissions },
    cookie,
    method: "POST"
  }));
}
async function homeTweetsQuery(cookie) {
  return await fetch(apiEndpoints.tweets.getHomeTweets, composeRequestInit({ cookie }));
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__shell/feed.tsx
var action5 = async ({ request }) => {
  const _a = await unpackRequest(request), { actionType, tweetId, commentId, cookie } = _a, data = __objRest(_a, ["actionType", "tweetId", "commentId", "cookie"]);
  switch (actionType) {
    case "like":
      return await likeTweetMutation(tweetId, cookie);
    case "retweet":
      return await retweetMutation(tweetId, cookie);
    case "save":
      return await saveTweetMutation(tweetId, cookie);
    case "create":
      return await createTweetMutation(cookie, data);
    default:
      break;
  }
};
var loader11 = async ({ request }) => {
  const cookie = getCookie(request);
  return await homeTweetsQuery(cookie);
};
function HomeRoute() {
  return /* @__PURE__ */ React.createElement(Home, null);
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__start.tsx
var start_exports = {};
__export(start_exports, {
  default: () => Start,
  loader: () => loader12
});

// app/modules/Start/start.server.ts
var import_node4 = require("@remix-run/node");
var registerMutation = async (registerCredentials) => {
  const registerResult = await fetch(apiEndpoints.auth.register, composeRequestInit({ method: "POST", body: registerCredentials }));
  if (registerResult.status === 201) {
    return (0, import_node4.redirect)("/login?registered=true");
  }
  return registerResult;
};
var loginMutation = async (loginCredentials) => {
  const loginResponse = await fetch(apiEndpoints.auth.login, composeRequestInit({ method: "POST", body: loginCredentials }));
  if (loginResponse.status === 201) {
    return (0, import_node4.redirect)(links.home, {
      headers: {
        "Set-Cookie": loginResponse.headers.get("Set-Cookie")
      }
    });
  }
  return loginResponse;
};
var authQuery = async (cookie) => {
  const user = await fetch(apiEndpoints.auth.me, composeRequestInit({ cookie }));
  return user;
};

// app/modules/Start/Login.tsx
var import_react44 = require("@remix-run/react");
var import_with_zod = require("@remix-validated-form/with-zod");
var import_remix_validated_form3 = require("remix-validated-form");
var import_zod = require("zod");
function Login() {
  const [searchParams] = (0, import_react44.useSearchParams)();
  const loginResult = (0, import_react44.useActionData)();
  const hasRegistered = searchParams.get("registered");
  return /* @__PURE__ */ React.createElement(Fade, null, /* @__PURE__ */ React.createElement(import_remix_validated_form3.ValidatedForm, {
    method: "post",
    action: "/login",
    validator: loginValidator,
    noValidate: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col mb-5"
  }, /* @__PURE__ */ React.createElement(ValidatedInput, {
    className: "px-3 py-1 text-black rounded-md",
    placeholder: "Username",
    name: "username",
    label: "Username"
  }), /* @__PURE__ */ React.createElement(ValidatedInput, {
    className: "px-3 py-1 text-black rounded-md ",
    placeholder: "Password",
    name: "password",
    label: "Password"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "h-5 mb-1"
  }, hasRegistered ? /* @__PURE__ */ React.createElement("span", {
    className: "text-green-500"
  }, "Registered successfully. Now you can login.") : /* @__PURE__ */ React.createElement("span", {
    className: "text-red-500"
  }, (loginResult == null ? void 0 : loginResult.message) ? loginResult.message : "")), /* @__PURE__ */ React.createElement(SubmitButton, {
    className: "w-full py-2 mb-8 font-bold text-white bg-blue-500 rounded-3xl hover:bg-blue-700"
  })));
}
var loginValidator = (0, import_with_zod.withZod)(import_zod.z.object({
  username: import_zod.z.string().nonempty("Username is required").min(5, "Username should at least 5 characters").max(20, "Username should have max 20 characters"),
  password: import_zod.z.string().nonempty("Password is required").min(5, "Password should at least 5 characters").max(20, "Password should have max 20 characters")
}));

// app/modules/Start/Register.tsx
var import_with_zod2 = require("@remix-validated-form/with-zod");
var import_remix_validated_form4 = require("remix-validated-form");
var import_zod2 = require("zod");
var import_react45 = require("@remix-run/react");
function Register() {
  const registerResult = (0, import_react45.useActionData)();
  return /* @__PURE__ */ React.createElement(Fade, null, /* @__PURE__ */ React.createElement(import_remix_validated_form4.ValidatedForm, {
    method: "post",
    action: "/register",
    validator: registerValidator,
    noValidate: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col mb-5"
  }, /* @__PURE__ */ React.createElement(ValidatedInput, {
    className: "px-3 py-1 text-black rounded-md ",
    placeholder: "Username",
    name: "username",
    label: "Username"
  }), /* @__PURE__ */ React.createElement(ValidatedInput, {
    className: "px-3 py-1 text-black rounded-md ",
    placeholder: "Password",
    name: "password",
    label: "Password"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "h-5 mb-1 text-red-500"
  }, (registerResult == null ? void 0 : registerResult.message) ? registerResult.message : "")), /* @__PURE__ */ React.createElement(SubmitButton, {
    className: "w-full py-2 mb-8 font-bold text-white bg-blue-500 rounded-3xl hover:bg-blue-700"
  })));
}
var registerValidator = (0, import_with_zod2.withZod)(import_zod2.z.object({
  username: import_zod2.z.string().nonempty("Username is required").min(5, "Username should at least 5 characters").max(20, "Username should have max 20 characters"),
  password: import_zod2.z.string().nonempty("Password is required").min(5, "Password should at least 5 characters").max(20, "Password should have max 20 characters")
}));

// app/modules/Start/StartShell.tsx
var import_react46 = require("@remix-run/react");
var import_clsx19 = __toESM(require("clsx"));
function StartShell() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex h-screen bg-black bg-gray-600"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative hidden w-1/2 h-full md:block"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full h-full bg-twitterBlue"
  })), /* @__PURE__ */ React.createElement("main", {
    className: "flex justify-center w-full px-12 py-20 text-white md:justify-start md:w-1/2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-sm"
  }, /* @__PURE__ */ React.createElement("p", {
    className: "text-2xl font-bold transition-colors text-twitterBlue hover:opacity-50"
  }, "Tw1ttr"), /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4 text-3xl font-bold"
  }, "Join Tw1ttr today."), /* @__PURE__ */ React.createElement(import_react46.Outlet, null), /* @__PURE__ */ React.createElement("div", {
    className: "h-[1px] rounded-2xl bg-gray4 mb-7"
  }), /* @__PURE__ */ React.createElement(import_react46.NavLink, {
    to: "register",
    replace: true,
    className: ({ isActive }) => (0, import_clsx19.default)(commonStyles2, isActive && activeFormStyle)
  }, /* @__PURE__ */ React.createElement("span", {
    className: "block"
  }, "Register")), /* @__PURE__ */ React.createElement("p", {
    className: "my-2 text-center"
  }, "Or"), /* @__PURE__ */ React.createElement(import_react46.NavLink, {
    to: "login",
    replace: true,
    className: ({ isActive }) => (0, import_clsx19.default)(commonStyles2, isActive && activeFormStyle)
  }, "Sign In"))));
}
var commonStyles2 = "rounded-3xl w-full py-2 bg-transparent border md:mx-0 font-bold text-twitterBlue hover:text-white grid place-items-center";
var activeFormStyle = "!text-white !bg-blue-500 !cursor-default";

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__start.tsx
var loader12 = async ({ request }) => {
  const cookie = getCookie(request);
  return await authQuery(cookie);
};
function Start() {
  return /* @__PURE__ */ React.createElement(StartShell, null);
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__start/register.tsx
var register_exports = {};
__export(register_exports, {
  action: () => action6,
  default: () => RegisterRoute
});
var action6 = async ({ request }) => {
  const { username, password } = await unpackRequest(request);
  return await registerMutation({ username, password });
};
function RegisterRoute() {
  return /* @__PURE__ */ React.createElement(Register, null);
}

// route:/Users/taylorcantwell/Documents/Projects/trellothree/apps/remix/app/routes/__start/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action7,
  default: () => LoginRoute
});
var action7 = async ({ request }) => {
  const { username, password } = await unpackRequest(request);
  return await loginMutation({ username, password });
};
function LoginRoute() {
  return /* @__PURE__ */ React.createElement(Login, null);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "3cf7b552", "entry": { "module": "/build/entry.client-CS77XXM2.js", "imports": ["/build/_shared/chunk-5ULS4RFU.js", "/build/_shared/chunk-KJJKQLBA.js", "/build/_shared/chunk-4HOG6TMD.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-SXG7M5DV.js", "imports": ["/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell": { "id": "routes/__shell", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell-2NB42SRW.js", "imports": ["/build/_shared/chunk-GIG6BHGS.js", "/build/_shared/chunk-4F233YQO.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/$username": { "id": "routes/__shell/$username", "parentId": "routes/__shell", "path": ":username", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/$username-Y6CB2QSF.js", "imports": ["/build/_shared/chunk-MXGI4U43.js", "/build/_shared/chunk-LRUYYE75.js", "/build/_shared/chunk-GV7B3TC7.js", "/build/_shared/chunk-5SYEG46C.js", "/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/$username/followers": { "id": "routes/__shell/$username/followers", "parentId": "routes/__shell/$username", "path": "followers", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/$username/followers-5OVI33XF.js", "imports": ["/build/_shared/chunk-C7MO5OAA.js", "/build/_shared/chunk-4F233YQO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/$username/following": { "id": "routes/__shell/$username/following", "parentId": "routes/__shell/$username", "path": "following", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/$username/following-ZMYFXVJ5.js", "imports": ["/build/_shared/chunk-C7MO5OAA.js", "/build/_shared/chunk-4F233YQO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/bookmarks": { "id": "routes/__shell/bookmarks", "parentId": "routes/__shell", "path": "bookmarks", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/bookmarks-T3A57KXB.js", "imports": ["/build/_shared/chunk-5SYEG46C.js", "/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/explore": { "id": "routes/__shell/explore", "parentId": "routes/__shell", "path": "explore", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/explore-UXRDWAJQ.js", "imports": ["/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/feed": { "id": "routes/__shell/feed", "parentId": "routes/__shell", "path": "feed", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/feed-WNFVU544.js", "imports": ["/build/_shared/chunk-GV7B3TC7.js", "/build/_shared/chunk-5SYEG46C.js", "/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/index": { "id": "routes/__shell/index", "parentId": "routes/__shell", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/__shell/index-MUYCVHJ5.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/logout": { "id": "routes/__shell/logout", "parentId": "routes/__shell", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/logout-OAIYEPST.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/tweet/$id": { "id": "routes/__shell/tweet/$id", "parentId": "routes/__shell", "path": "tweet/:id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/tweet/$id-VCDSUB35.js", "imports": ["/build/_shared/chunk-SENF7XRN.js", "/build/_shared/chunk-5SYEG46C.js", "/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": true, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/tweet/$id/likes": { "id": "routes/__shell/tweet/$id/likes", "parentId": "routes/__shell/tweet/$id", "path": "likes", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/tweet/$id/likes-QVTDGTW2.js", "imports": ["/build/_shared/chunk-C7MO5OAA.js", "/build/_shared/chunk-4F233YQO.js", "/build/_shared/chunk-LRUYYE75.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/tweet/$id/retweets": { "id": "routes/__shell/tweet/$id/retweets", "parentId": "routes/__shell/tweet/$id", "path": "retweets", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/tweet/$id/retweets-E5SWFA2P.js", "imports": ["/build/_shared/chunk-C7MO5OAA.js", "/build/_shared/chunk-4F233YQO.js", "/build/_shared/chunk-LRUYYE75.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__shell/tweet/$id/saves": { "id": "routes/__shell/tweet/$id/saves", "parentId": "routes/__shell/tweet/$id", "path": "saves", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__shell/tweet/$id/saves-G5I6MOUF.js", "imports": ["/build/_shared/chunk-C7MO5OAA.js", "/build/_shared/chunk-4F233YQO.js", "/build/_shared/chunk-LRUYYE75.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__start": { "id": "routes/__start", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__start-PAWXDDZ6.js", "imports": ["/build/_shared/chunk-HYKFR3TO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__start/login": { "id": "routes/__start/login", "parentId": "routes/__start", "path": "login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__start/login-QNJYJJH3.js", "imports": ["/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/__start/register": { "id": "routes/__start/register", "parentId": "routes/__start", "path": "register", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/__start/register-XJEBCIZU.js", "imports": ["/build/_shared/chunk-TTUG3QV2.js", "/build/_shared/chunk-LNG6L6E6.js"], "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-3CF7B552.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/__shell": {
    id: "routes/__shell",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: shell_exports
  },
  "routes/__shell/$username": {
    id: "routes/__shell/$username",
    parentId: "routes/__shell",
    path: ":username",
    index: void 0,
    caseSensitive: void 0,
    module: username_exports
  },
  "routes/__shell/$username/followers": {
    id: "routes/__shell/$username/followers",
    parentId: "routes/__shell/$username",
    path: "followers",
    index: void 0,
    caseSensitive: void 0,
    module: followers_exports
  },
  "routes/__shell/$username/following": {
    id: "routes/__shell/$username/following",
    parentId: "routes/__shell/$username",
    path: "following",
    index: void 0,
    caseSensitive: void 0,
    module: following_exports
  },
  "routes/__shell/bookmarks": {
    id: "routes/__shell/bookmarks",
    parentId: "routes/__shell",
    path: "bookmarks",
    index: void 0,
    caseSensitive: void 0,
    module: bookmarks_exports
  },
  "routes/__shell/tweet/$id": {
    id: "routes/__shell/tweet/$id",
    parentId: "routes/__shell",
    path: "tweet/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/__shell/tweet/$id/retweets": {
    id: "routes/__shell/tweet/$id/retweets",
    parentId: "routes/__shell/tweet/$id",
    path: "retweets",
    index: void 0,
    caseSensitive: void 0,
    module: retweets_exports
  },
  "routes/__shell/tweet/$id/likes": {
    id: "routes/__shell/tweet/$id/likes",
    parentId: "routes/__shell/tweet/$id",
    path: "likes",
    index: void 0,
    caseSensitive: void 0,
    module: likes_exports
  },
  "routes/__shell/tweet/$id/saves": {
    id: "routes/__shell/tweet/$id/saves",
    parentId: "routes/__shell/tweet/$id",
    path: "saves",
    index: void 0,
    caseSensitive: void 0,
    module: saves_exports
  },
  "routes/__shell/explore": {
    id: "routes/__shell/explore",
    parentId: "routes/__shell",
    path: "explore",
    index: void 0,
    caseSensitive: void 0,
    module: explore_exports
  },
  "routes/__shell/logout": {
    id: "routes/__shell/logout",
    parentId: "routes/__shell",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/__shell/index": {
    id: "routes/__shell/index",
    parentId: "routes/__shell",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: shell_exports2
  },
  "routes/__shell/feed": {
    id: "routes/__shell/feed",
    parentId: "routes/__shell",
    path: "feed",
    index: void 0,
    caseSensitive: void 0,
    module: feed_exports
  },
  "routes/__start": {
    id: "routes/__start",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: start_exports
  },
  "routes/__start/register": {
    id: "routes/__start/register",
    parentId: "routes/__start",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/__start/login": {
    id: "routes/__start/login",
    parentId: "routes/__start",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};

// server.js
function getLoadContext(event, context) {
  let rawAuthorizationString;
  let netlifyGraphToken;
  if (event.authlifyToken != null) {
    netlifyGraphToken = event.authlifyToken;
  }
  let authHeader = event.headers["authorization"];
  let graphSignatureHeader = event.headers["x-netlify-graph-signature"];
  if (authHeader != null && /Bearer /gi.test(authHeader)) {
    rawAuthorizationString = authHeader.split(" ")[1];
  }
  let loadContext = {
    clientNetlifyGraphAccessToken: rawAuthorizationString,
    netlifyGraphToken,
    netlifyGraphSignature: graphSignatureHeader
  };
  Object.keys(loadContext).forEach((key) => {
    if (loadContext[key] == null) {
      delete loadContext[key];
    }
  });
  return loadContext;
}
var handler = (0, import_netlify.createRequestHandler)({
  build: server_build_exports,
  getLoadContext,
  mode: "development"
});
module.exports = __toCommonJS(server_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=server.js.map
