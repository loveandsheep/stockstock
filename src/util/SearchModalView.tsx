import * as React from 'react';
import { Autocomplete, Button, Dialog, TextField } from '@mui/material';
import { tagInfo } from '../view/ItemCard';

export interface ISearchModalViewProps {
    open: boolean,
    onClose: VoidFunction,
    doSearch: (tagId: Array<string>) => void,
    tagList: {[name: string]: tagInfo}
    tagListArr: Array<string>,
}

export default function SearchModalView (props: ISearchModalViewProps) {

    const [tagEditor, setTagEditor] = React.useState<string[]>([]);

    React.useEffect(() =>{
        
        setTagEditor([]);

    }, [props.open]);

    const onSearch = () => {
        let idList = [];

        for (let ek in tagEditor)
        {
            for (let key in props.tagList)
            {
                if (props.tagList[key].label === tagEditor[ek])
                {
                    idList.push(key);
                }
            }    
        }
        props.doSearch(idList);
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth='sm'>

            <Autocomplete 
                style={{margin: '10px', minWidth: '200px'}}
                multiple
                autoHighlight
                freeSolo
                renderInput={(params) => <TextField {...params} variant='standard' label='search tags'/>} 
                id="tagEditor"
                options={props.tagListArr}
                size="medium"
                value={tagEditor}
                onChange={(_event: any, value: string[]) => {setTagEditor(value);}}
            />
            <Button onClick={onSearch} variant='contained' style={{margin: '10px'}}>search</Button>
        </Dialog>
    );
}
