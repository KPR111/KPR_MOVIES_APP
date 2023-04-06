import privateClient from "../client/private.client";

const favorteEndpoints = {
    list: "user/favorites",
    add: "user/favorites",
    remove: ({ favoriteId }) => `user/favorites/${favoriteId}`
};

const favoriteId = {
    getList: async () => {
        try {
            const response = await privateClient.get(favorteEndpoints.list);

            return { response }
        } catch (err) { return { err } }
    },
    add: async ({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate 
    }) => {
        try {
            const response = await privateClient.post(
                favorteEndpoints.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    mediaRate
                }
            );

            return { response }
        } catch (err) { return { err } }
    },
    remove: async ({favoriteId}) => {
        try {
            const response = await privateClient.delete(
                favorteEndpoints.remove({favoriteId})
            );

            return { response }
        } catch (err) { return { err } }
    },

}

export default favoriteId