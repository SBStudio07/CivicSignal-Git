import { MAX_PHOTO_MB, MIN_DESCRIPTION_LENGTH } from '@/config/constants';

export function validateReport({ category, description, position, photo }) {
  const errors = {};
  if (!category) errors.category = 'Choose what kind of problem this is.';
  if (!position) errors.position = 'Drop a pin on the map so crews can find it.';
  if (description.trim().length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `Describe the problem in at least ${MIN_DESCRIPTION_LENGTH} characters.`;
  }
  if (photo) {
    if (!photo.type.startsWith('image/')) errors.photo = 'That file is not an image.';
    else if (photo.size > MAX_PHOTO_MB * 1024 * 1024) errors.photo = `Photo is larger than ${MAX_PHOTO_MB} MB.`;
  }
  return errors;
}
