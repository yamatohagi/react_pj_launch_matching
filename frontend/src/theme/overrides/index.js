import { merge } from 'lodash';
import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
import Typography from './Typography';
import IconButton from './IconButton';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Card(theme),
    Paper(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Typography(theme),
    IconButton(theme)
  );
}
