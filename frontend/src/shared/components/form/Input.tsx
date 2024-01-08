import { FormControl, InputBase, InputBaseProps, InputLabel } from '@mui/material';
import { FC } from 'react';

type InputProps = InputBaseProps & { label?: string, htmlFor?: string };
export const Input: FC<InputProps> = (props) => 
<FormControl variant="standard" fullWidth>
  <InputLabel 
    htmlFor={props.htmlFor} 
    size='normal'
    shrink
  >{props.label}</InputLabel>
  <InputBase {...props} />
</FormControl>;
