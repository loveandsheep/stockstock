import { Box, Chip, Card, Typography, CardContent, CardMedia, Dialog, CardActionArea, CardActions, Button, TextField, CircularProgress, IconButton, Fab, Autocomplete } from '@mui/material';
import * as React from 'react';
import { cardInfo, tagInfo } from '../view/ItemCard';
import DetailEditor from './DetailEditorComponent';
import { useState } from 'react';
import { db_getTag, db_updateCard } from './database';
import AddIcon from '@mui/icons-material/AddCircle';
import { editButtonBoxStyle } from './DetailEditorComponent';
import EditIcon from '@mui/icons-material/Edit';
import Check from '@mui/icons-material/Check';

export interface IItemDetailViewProps {
    card: cardInfo,
    open: boolean,
    onClose: VoidFunction,
    onUpdate: (id: string) => void,
    tagList: {[name: string]: tagInfo},
    tagListArr: Array<string>,
    reloadTag: VoidFunction,
}


export default function ItemDetailView(props: IItemDetailViewProps) {

    //編集されるカード情報
    const [tempCard, setCard] = useState(props.card);
    const [saving, setSaving] = useState(false);
    const [tagEditor, setTagEditor] = useState<string[]>([]);
    const [tagEditFlag, setTagEditFlag] = useState(false);

    React.useEffect(() => {
        setCard(props.card);
    }, [props.card]);

    const changeTitle = (value: string) => {
        const nc: cardInfo = tempCard;
        nc.title = value;
        setCard(nc);
    }

    const changeDetail = (value: string) => {
        const nc: cardInfo = tempCard;
        nc.detail = value;
        setCard(nc);
    }

    const saveCardInformation = async () => {
        if (tagEditFlag) await tagCreate();
        setSaving(true);
        db_updateCard(tempCard).then(() => {
            props.onUpdate(tempCard.itemId);
            props.onClose();
            setSaving(false);
        })
    }

    const tagCreate = async () => {
        if (tagEditFlag)
        {
            const newCard = Object.assign(tempCard);
            newCard.tagArr = [];
            newCard.tags = [];

            let newTagExist = false;

            for (let tkey in tagEditor)
            {
                const tag = tagEditor[tkey];
                let tagExist = false;
                for (let key in props.tagList)
                {
                    if (tag === props.tagList[key].label)
                    {
                        tagExist = true;
                        newCard.tags.push(props.tagList[key].id);

                        if (newCard.tagArr !== undefined) 
                            newCard.tagArr.push(props.tagList[key]);
                    }
                }
                if (!tagExist) 
                {
                    let newId: string = await db_getTag(tag);
                    newCard.tags.push(newId);
                    newCard.tagArr.push({
                        label: tag,
                        id: newId,
                        color: '#333',
                    })
                    newTagExist = true;
                }
            }

            if (newTagExist) props.reloadTag();

            setCard(newCard);
            setTagEditFlag(false);
        }
        else
        {
            const tagNameArr: Array<string> = [];
            tempCard.tagArr?.forEach((tag) => {tagNameArr.push(tag.label);});
            setTagEditor(tagNameArr);
            setTagEditFlag(true);
        }
    }

    const cancelEdit = () => {
        setTagEditFlag(false);
        props.onClose();
    }


    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth='lg'>
            <Card>
                <CardMedia
                    component="img"
                    height={250}
                    image={props.card.thumb}
                />
                <CardContent>

                    <DetailEditor
                        onChange={changeTitle}
                        default={tempCard.title}
                        label={'title'}
                        multiline={false}
                        variant='h6'
                    />
                    <DetailEditor
                        onChange={changeDetail}
                        default={tempCard.detail}
                        label={'detail'}
                        multiline={true}
                        variant='caption'
                    />


                </CardContent>
                {/* タグ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}

                {!tagEditFlag ? 
                <Box style={{ marginLeft: '10px', marginRight: '10px', display: 'flex' , justifyContent: 'space-between'}}>
                    <Box style={{display: 'flex'}}>
                        {tempCard.tagArr ?
                            tempCard.tagArr.map(((tag: tagInfo, index) =>
                                <Chip
                                    style={{ margin: '2px', background: tag.color }} key={index} label={tag.label} size="small" color='primary' />
                        )) : <></>}
                    </Box>
                    
                    <Box style= {editButtonBoxStyle}>
                        <IconButton onClick={tagCreate} aria-label="edit">
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                    </Box>

                </Box>
                :
                <Box style={{ margin: '10px',display: 'flex', justifyContent: 'space-between' }} >
                <Autocomplete
                            multiple
                            autoHighlight
                            freeSolo
                            renderInput={(params) => <TextField {...params} variant='standard' hiddenLabel/>} 
                            id="tagEditor"
                            options={props.tagListArr}
                            size="small"
                            fullWidth
                            value={tagEditor}
                            onChange={(_event: any, value: string[]) => {setTagEditor(value);}}
                        />
                <Box style= {editButtonBoxStyle}>
                    <IconButton onClick={tagCreate} aria-label="edit">
                        <Check fontSize="inherit" />
                    </IconButton>
                    </Box>
                </Box>
                }

                <CardActions style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button variant='outlined' size='small' onClick={cancelEdit}>Cancel</Button>
                    <Button variant='contained' color='primary' size='small' onClick={saveCardInformation} disabled={saving}>
                        {saving ?
                            <CircularProgress size={30} thickness={6} />
                            : <>Save</>}
                    </Button>
                </CardActions>
            </Card>
        </Dialog>
    );
};