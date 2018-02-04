import { IVariant } from './variant';


export interface ICheckoutItem {
  customAttributes?: Array<any>;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  id?: string;
  quantity: number;
  title?: string;
  variant: IVariant;
  variableValues?: {
    checkoutId: string;
    lineItems: { variantId: string, quantity: number }[]
  }
}

export interface ICheckout {
  completedAt: string;
  createdAt: string;
  currencyCode: string;
  customAttributes: Array<any>;
  id: string;
  lineItems: ICheckoutItem[];
  note: string;
  order: string;
  orderStatusUrl: string;
  paymentDue: string;
  ready: boolean;
  requiresShipping: boolean;
  shippingAddress: string;
  shippingLine: string;
  subtotalPrice: string;
  taxExempt: boolean;
  taxesIncluded: boolean;
  totalPrice: string;
  totalTax: string;
  updatedAt: string;
  webUrl: string;
}

export class Checkout implements ICheckout {
  completedAt = null;
  createdAt = null;
  currencyCode = null;
  customAttributes = []
  id = null;
  lineItems = [];
  note = null;
  order = null;
  orderStatusUrl = null;
  paymentDue = null;
  ready = false;
  requiresShipping = null;
  shippingAddress = null;
  shippingLine = null;
  subtotalPrice = null;
  taxExempt = false;
  taxesIncluded = false;
  totalPrice = null;
  totalTax = null;
  updatedAt = null;
  webUrl = null;  
}

export interface ICreateCheckoutOptions {
  lineItems: Array<{ variantId: string, quantity: number }>;
}
