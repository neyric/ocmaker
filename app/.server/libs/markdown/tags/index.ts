import type { Schema } from "@markdoc/markdoc";

export const image: Schema = {
  render: "Image",
  attributes: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
    className: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    proxy: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: String,
    },
  },
};

export const heading: Schema = {
  render: "Heading",
  attributes: {
    order: {
      type: Number,
      required: true,
      default: 1,
    },
    id: {
      type: String,
    },
    className: {
      type: String,
    },
  },
};
