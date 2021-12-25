import * as React from 'react';
import { Box } from '@mui/system';
import { Dialog, Tabs, Tab, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { db_createNewCardFromURL, db_getItem, db_getItems } from '../util/database';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';


export interface ICreateCardModalViewProps {
    open: boolean,
    onClose: VoidFunction,
    onNewCard: (data: DocumentData, id: any) => void,
}

export interface ICreateCardModalViewState {
    tabSelect: number,
    urlText: string,
    adding: boolean,
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default class CreateCardModalView extends React.Component<ICreateCardModalViewProps, ICreateCardModalViewState> {
    constructor(props: ICreateCardModalViewProps) {
        super(props);

        this.state = {
            tabSelect: 0,
            urlText: "",
            adding: false,
        }
    }

    tabChange = (_event: React.SyntheticEvent, newValue: number) => {
        this.setState({tabSelect: newValue});
    }

    addNewCard = () => {
        const url = this.state.urlText;
        this.setState({adding: true});
        db_createNewCardFromURL(url).then((newId) => {
            db_getItem(newId).then((dsnap) => {
                if (dsnap)
                {
                    this.props.onNewCard(dsnap.data()!, newId);
                    this.setState({
                        adding: false,
                        urlText: "",
                    });
                    this.props.onClose();
                }
            })
        });
    }

    urlTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({urlText: event.target.value});
    }


    public render() {

        const dialogStyle = {
            overflow: 'hidden',
        }

        const EditorStyle = {
            margin: '10px',
        } as React.CSSProperties;

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} maxWidth='lg'>
                <Box style={dialogStyle}>
                    <Tabs value={this.state.tabSelect} onChange={this.tabChange} aria-label="cardType tab">
                        <Tab label="Web" {...a11yProps(0)} />
                        <Tab label="Stock" {...a11yProps(1)} />
                        <Tab label="Others" {...a11yProps(2)} />
                    </Tabs>
                    <Box style={EditorStyle}>
                    <TextField 
                        fullWidth 
                        label="URL"
                        placeholder='https://'
                        onChange={this.urlTextChange}
                        value={this.state.urlText}
                        autoFocus
                    />
                    <Button
                        onClick={this.addNewCard}
                        style={{marginTop: '10px'}}
                        color='primary' 
                        variant='contained' fullWidth disabled={this.state.adding} >
                        {this.state.adding ? 
                        <CircularProgress size={30} thickness={6}/>:
                        <>add</>
                        }
                    </Button>
                    </Box>
                </Box>
            </Dialog>
        );
    }
}
