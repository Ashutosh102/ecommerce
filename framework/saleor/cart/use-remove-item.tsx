import { useCallback } from 'react'
import type { MutationHookContext, HookFetcherContext, MutationHook } from '@commerce/utils/types'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import useCart from './use-cart'
import * as mutation from '../utils/mutations'
import { getCheckoutId, checkoutToCart } from '../utils'
import { Mutation, MutationCheckoutLineDeleteArgs } from '../schema'
import { LineItem, RemoveItemHook } from '../types/cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler = {
  fetchOptions: { query: mutation.CheckoutLineDelete },
  async fetcher({ input: { itemId }, options, fetch }: HookFetcherContext<RemoveItemHook>) {
    const data = await fetch<Mutation, MutationCheckoutLineDeleteArgs>({
      ...options,
      variables: {
        checkoutId: getCheckoutId().checkoutId,
        lineId: itemId,
      },
    })
    return checkoutToCart(data.checkoutLineDelete)
  },
  useHook: ({ fetch }: MutationHookContext<RemoveItemHook>) => <
    T extends LineItem | undefined = undefined
  > () => {
      const { mutate } = useCart()

      return useCallback(
        async function removeItem(input) {
          const data = await fetch({ input: { itemId: input.id } })
          await mutate(data, false)

          return data
        },
        [fetch, mutate]
      );
    },
}
