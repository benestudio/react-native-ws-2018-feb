// @flow

import { NativeModules, Platform } from 'react-native';

type FieldType =
  | typeof PHONE_NUMBERS
  | typeof EMAILS
  | typeof ADDRESSES
  | typeof IMAGE
  | typeof THUMBNAIL
  | typeof NOTE
  | typeof BIRTHDAY
  | typeof NON_GREGORIAN_BIRTHDAY
  | typeof NAME_PREFIX
  | typeof NAME_SUFFIX
  | typeof PHONETIC_FIRST_NAME
  | typeof PHONETIC_MIDDLE_NAME
  | typeof PHONETIC_LAST_NAME
  | typeof SOCIAL_PROFILES
  | typeof IM_ADDRESSES
  | typeof URLS
  | typeof DATES
  | typeof RELATIONSHIPS;

type Options = {
  id?: string,
  pageSize?: number,
  pageOffset?: number,
  fields?: FieldType[],
};

type Contact = {
  id: string,
  contactType: string,
  name: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  previousLastName?: string,
  namePrefix?: string,
  nameSuffix?: string,
  nickname?: string,
  phoneticFirstName?: string,
  phoneticMiddleName?: string,
  phoneticLastName?: string,
  birthday?: {
    day?: number,
    month?: number,
    year?: number,
  },
  nonGregorianBirthday?: {
    day?: number,
    month?: number,
    year?: number,
  },
  emails?: {
    email?: string,
    primary?: boolean,
    label: string,
    id: string,
  }[],
  phoneNumbers?: {
    number?: string,
    primary?: boolean,
    digits?: string,
    countryCode?: string,
    label: string,
    id: string,
  }[],
  addresses?: {
    street?: string,
    city?: string,
    country?: string,
    region?: string,
    neighborhood?: string,
    postalCode?: string,
    poBox?: string,
    isoCountryCode?: string,
    label: string,
    id: string,
  }[],
  socialProfiles?: {
    service?: string,
    localizedProfile?: string,
    url?: string,
    username?: string,
    userId?: string,
    label: string,
    id: string,
  }[],
  instantMessageAddresses?: {
    service?: string,
    username?: string,
    localizedService?: string,
    label: string,
    id: string,
  }[],
  urls?: {
    label: string,
    url?: string,
    id: string,
  }[],
  company?: string,
  jobTitle?: string,
  department?: string,
  imageAvailable?: boolean,
  image?: {
    uri?: string,
  },
  thumbnail?: {
    uri?: string,
  },
  note?: string,
  dates?: {
    day?: number,
    month?: number,
    year?: number,
    id: string,
    label: string,
  }[],
  relationships?: {
    label: string,
    name?: string,
    id: string,
  }[],
};

type Response = {
  data: Contact[],
  total: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
};

const DEFAULT_PAGE_SIZE = 100;

export async function getContactsAsync(
  { pageSize = DEFAULT_PAGE_SIZE, pageOffset = 0, fields = [] }: Options = {}
): Promise<Response> {
  if (Platform.OS === 'ios' && (fields.includes(IMAGE) || fields.includes(THUMBNAIL))) {
    console.warn(
      'Mind that fetching images for all contacts might be time and resource consuming. ' +
        'Consider using getContactByIdAsync() to get data for a single contact.'
    );
  }
  return await NativeModules.ExponentContacts.getContactsAsync({
    pageSize,
    pageOffset,
    fields,
  });
}

export async function getContactByIdAsync({ fields = [], id }: Options = {}): Promise<Response> {
  if (id == null) {
    throw new Error('Please pass an ID as a parameter');
  } else {
    return await NativeModules.ExponentContacts.getContactsAsync({
      pageSize: 1,
      pageOffset: 0,
      fields,
      id,
    });
  }
}

export const PHONE_NUMBERS = 'phoneNumbers';
export const EMAILS = 'emails';
export const ADDRESSES = 'addresses';
export const IMAGE = 'image';
export const THUMBNAIL = 'thumbnail';
export const NOTE = 'note';
export const BIRTHDAY = 'birthday';
export const NON_GREGORIAN_BIRTHDAY = 'nonGregorianBirthday';
export const NAME_PREFIX = 'namePrefix';
export const NAME_SUFFIX = 'nameSuffix';
export const PHONETIC_FIRST_NAME = 'phoneticFirstName';
export const PHONETIC_MIDDLE_NAME = 'phoneticMiddleName';
export const PHONETIC_LAST_NAME = 'phoneticLastName';
export const SOCIAL_PROFILES = 'socialProfiles';
export const IM_ADDRESSES = 'instantMessageAddresses';
export const URLS = 'urlAddresses';
export const DATES = 'dates';
export const RELATIONSHIPS = 'relationships';
