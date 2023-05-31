import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export const AllUsers_QueryDocument = gql`
    query allUsers_query {
  allUsers {
    username
    email
    password
    verificationCode
    verificationEmailSent
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllUsers_QueryGQL extends Apollo.Query<AllUsers_QueryQuery, AllUsers_QueryQueryVariables> {
    document = AllUsers_QueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserById_QueryDocument = gql`
    query userById_query($id: String!) {
  userById(id: $id) {
    username
    email
    password
    verificationCode
    verificationEmailSent
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserById_QueryGQL extends Apollo.Query<UserById_QueryQuery, UserById_QueryQueryVariables> {
    document = UserById_QueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const Login_QueryDocument = gql`
    query login_query($username: String!, $password: String!) {
  login(username: $username, password: $password)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class Login_QueryGQL extends Apollo.Query<Login_QueryQuery, Login_QueryQueryVariables> {
    document = Login_QueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const Register_MutationDocument = gql`
    mutation register_mutation($username: String!, $password: String!, $email: String!) {
  register(username: $username, password: $password, email: $email) {
    username
    email
    password
    verificationCode
    verificationEmailSent
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class Register_MutationGQL extends Apollo.Mutation<Register_MutationMutation, Register_MutationMutationVariables> {
    document = Register_MutationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserGqlModel;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<UserGqlModel>;
  login: Scalars['String']['output'];
  userById: UserGqlModel;
};


export type QueryLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String']['input'];
};

export type UserGqlModel = {
  __typename?: 'UserGqlModel';
  email: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
  verificationCode?: Maybe<Scalars['String']['output']>;
  verificationEmailSent?: Maybe<Scalars['Boolean']['output']>;
};

export type AllUsers_QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsers_QueryQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'UserGqlModel', username: string, email: string, password?: string | null, verificationCode?: string | null, verificationEmailSent?: boolean | null, role: string }> };

export type UserById_QueryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UserById_QueryQuery = { __typename?: 'Query', userById: { __typename?: 'UserGqlModel', username: string, email: string, password?: string | null, verificationCode?: string | null, verificationEmailSent?: boolean | null, role: string } };

export type Login_QueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type Login_QueryQuery = { __typename?: 'Query', login: string };

export type Register_MutationMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type Register_MutationMutation = { __typename?: 'Mutation', register: { __typename?: 'UserGqlModel', username: string, email: string, password?: string | null, verificationCode?: string | null, verificationEmailSent?: boolean | null, role: string } };
