import { Button, Dialog, Paper, ToggleButton, ToggleButtonGroup, Box, Typography, TextField, Slider } from '@mui/material';
import * as React from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import { cardInfo } from './ItemCard';

export interface IThumbnailEditorViewProps {
    card: cardInfo,    
    open: boolean,
    onClose: VoidFunction,
    onChange: (type: string, value: string) => void,
}

export function ThumbnailEditorView (props: IThumbnailEditorViewProps) {

    const [type, setType] = React.useState('ogp');//ogp, color, local
    const [value, setValue] = React.useState('');
    const [hue, setHue] = React.useState(0.6);
    const [sat, setSat] = React.useState(0.25);
    const [bri, setBri] = React.useState(0.5);

    React.useEffect(() => {
        setValue(props.card.thumb);
        setType(props.card.thumbRef);
    }, [props.card]);

    const style_paper = {
        padding: '20px',
    }

    const getColor = (): string => {
        return 'hsl(' + hue*360 + ',' + sat*100 + '%,' + bri*100 + '%)';
    }

    const handleHue = (event: Event, newValue: number | number[]) => {
        const t = event;
        setHue(newValue as number);
        setValue(getColor());
    };

    const handleSat = (event: Event, newValue: number | number[]) => {
        const t = event;
        setSat(newValue as number);
        setValue(getColor());
    };

    const handleBri = (event: Event, newValue: number | number[]) => {
        const t = event;
        setBri(newValue as number);
        setValue(getColor());
    };

    const changeType = (event: React.MouseEvent<HTMLElement>, val: string) => {
        const t = event;
        setType(val);
        if (val == 'color') setValue(getColor());
    }

    const onSave = () => {
        props.onChange(type, value);
        props.onClose();
    }

    const colorBox = {
        padding: '10px',
        paddingRight: '18px',
        borderRadius: '10px',
        background: getColor(),
    }

    return (
        <Dialog open={props.open} maxWidth='lg'>
            <Paper style={style_paper}>
                <Box style={{display: 'flex', marginBottom: '10px', alignItems: 'center'}}>
                    <Typography variant='h5' style={{marginRight: '10px'}}>
                        CardMedia style
                    </Typography>
                    <ToggleButtonGroup size='small' value={type} exclusive onChange={changeType}>
                        <ToggleButton value='ogp' aria-label='ogp'>URL</ToggleButton>
                        <ToggleButton value='color' aria-label='color'>Color</ToggleButton>
                        <ToggleButton value='local' aria-label='local' disabled>Local</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box style={{padding: '1px'}}>
                    {type == 'ogp' ? 
                    <TextField size='medium' value={value} label='URL' fullWidth/> :
                    <Box style={colorBox}>
                    Hue
                    <Slider size='small' min={0} max={1} step={0.01} valueLabelDisplay='auto' value={hue} onChange={handleHue}/>
                    Saturation
                    <Slider size='small' min={0} max={1} step={0.01} valueLabelDisplay='auto' value={sat} onChange={handleSat}/>
                    Lightness
                    <Slider size='small' min={0} max={1} step={0.01} valueLabelDisplay='auto' value={bri} onChange={handleBri}/>
                    </Box>
                    }
                    
                    
                </Box>
                <Box style={{marginTop: '10px', display: 'flex', justifyContent:'flex-end'}}>
                    <Button variant='outlined' onClick={props.onClose}>cancel</Button>
                    <Button variant='contained' onClick={onSave} style={{marginLeft: '10px'}}>save</Button>
                </Box>
            </Paper>
        </Dialog>
    );
}
