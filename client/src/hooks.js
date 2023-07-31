import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {makeRequest} from './axios'

export function useCustomQuery(Querykey,postId,url) {
    return useQuery(
      [Querykey, postId],
      () => makeRequest.get(url).then((res) => res.data)
    );
}