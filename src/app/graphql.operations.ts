import { gql } from 'apollo-angular';

export const GET_ALL_POSTS = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          name
          username
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        name
        username
      }
      comments(options: { paginate: { page: 1, limit: 4 } }) {
        data {
          name
          email
          body
        }
      }
    }
  }
`;

export const GET_POSTS_BY_SEARCH = gql`
  query SearchPostsByTitle($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        user {
          name
          username
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      title
      body
    }
  }
`;

export const UPDATE_POST = gql`
  mutation ($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      title
      body
    }
  }
`;
