import http from "../http-common";

const getAll = () => {
    return http.get("/music");
};

const get = (id) => {
    return http.get(`/music/${id}`);
};

const create = (data) => {
    return http.post("/music/", data);
};

const update = (id, data) => {
    return http.put(`/music/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/music/${id}`);
};

const removeAll = () => {
    return http.delete(`/music`);
};

const findByTitle = (title) => {
    return http.get(`/music?title=${title}`);
};

const SongService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle,
};

export default SongService;
