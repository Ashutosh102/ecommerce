import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { bigcommerceProvider, BigcommerceProvider } from './provider'

export { bigcommerceProvider }
export type { BigcommerceProvider }

export const CommerceProvider = getCommerceProvider(bigcommerceProvider)

export const useCommerce = () => useCoreCommerce<BigcommerceProvider>()
