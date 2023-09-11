import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  CREATE_POST,
  GET_ALL_POSTS,
  GET_POSTS_BY_SEARCH,
  GET_SINGLE_POST,
  UPDATE_POST
} from '../graphql.operations';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apollo: Apollo) { }

  getAllPosts(page: number, limit: number): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery({
      query: GET_ALL_POSTS,
      variables: {
        options: {
          paginate: {
            page,
            limit,
          },
        },
      },
    }).valueChanges as Observable<ApolloQueryResult<any>>;
  }

  searchPostsByTitle(
    title: string,
    page: number,
    limit: number
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery({
      query: GET_POSTS_BY_SEARCH,
      variables: {
        options: {
          search: {
            q: title,
          },
          paginate: {
            page,
            limit,
          },
        },
      },
    }).valueChanges as Observable<ApolloQueryResult<any>>;
  }

  getSinglePost(
    id: number,
    page: number,
    limit: number
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery({
      query: GET_SINGLE_POST,
      variables: {
        id,
        options: {
          paginate: {
            page,
            limit,
          },
        },
      },
    }).valueChanges;
  }

  createSinglePost(
    title: string,
    body: string
  ): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: CREATE_POST,
      variables: {
        input: {
          title,
          body,
        }
      },
    });
  }

  updatePost(
    id: string,
    title: string,
    body: string
  ): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: UPDATE_POST,
      variables: {
        id,
        input: {
          title,
          body,
        }
      },
    });
  }


}
