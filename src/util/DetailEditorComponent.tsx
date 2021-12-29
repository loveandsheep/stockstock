import { Box, flexbox } from '@mui/system';
import { IconButton, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export interface IDetailEditorProps {
    variant: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined,
    onChange: (value: string) => void,
    default: string,
    label: string,
    multiline: boolean,
}

export default function DetailEditor (props: IDetailEditorProps) {

    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.default);
    const [hover, setHover] = useState(false);


    const toggleEdit = () => {
        setEdit(!edit);
    }

    const textChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        props.onChange(event.target.value);
    }

    const boxStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        align: 'center',
    }

    const editButtonBoxStyle = {
        width: '50px',
        height: '40px',
    }

    const onEnter = () => {setHover(true);}
    const onRelease = () => {setHover(false);}

    return (
            <Box style={boxStyle}
                onMouseEnter={onEnter}
                onMouseLeave={onRelease}
            >
                {edit ? 
                <TextField 
                variant="standard"
                label={props.label}
                value={text}
                onChange={textChange}
                multiline={props.multiline}
                autoFocus fullWidth/>
                : 
                <Typography variant={props.variant}>
                    {text}
                </Typography>
                    }
                
                <Box style= {editButtonBoxStyle}>
                {hover ? 
                    <IconButton onClick={toggleEdit} aria-label="edit">
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                :<></>}
                </Box>

                
            </Box>
    );
}
