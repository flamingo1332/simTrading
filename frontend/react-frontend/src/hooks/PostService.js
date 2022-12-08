import axios from 'axios';

// PostDto 아니라 PostResponse(pagination용) 사용하려면 다르게 해야함
const POST_API_BASE_URL = "http://localhost:8080/api/v1/posts"

class PostService {

    getPosts() {
        return axios.get(POST_API_BASE_URL + "/dto");
    }

    createPost(post) {
        console.log(post);
        return axios.post(POST_API_BASE_URL, post, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getPostById(postId) {
        return axios.get(POST_API_BASE_URL + '/' + postId);
    }

    updatePost(post, postId) {
        console.log(post);
        return axios.put(POST_API_BASE_URL + '/' + postId, {
            headers: {
                'Content-Type': 'application/json'// Post는 문제없는데 Put은 json 명시안하면 requestbody 없다고 에러
            }
        });
    }

    deletePost(postId) {
        return axios.delete(POST_API_BASE_URL + '/' + postId)
    }
}

export default new PostService();