import merge from "lodash.merge";
import { bookingResolvers } from "./booking";
import { listingResolvers } from "./listing";
import { userResolvers } from "./user";
import { viewerResolvers } from "./viewer";

export const resolvers = merge(
    bookingResolvers,
    listingResolvers,
    userResolvers,
    viewerResolvers
);
