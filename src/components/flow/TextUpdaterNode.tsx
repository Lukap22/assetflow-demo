import { Button, Grid, Paper, Stack, TextField } from '@mui/material';
import ActionDialog2 from 'components/mui/ActionDialog2';

import { useCallback, useState } from 'react';
import { Handle, Position, useKeyPress } from 'reactflow';

const handleStyle = { padding: 3 };

export default function TextUpdaterNode({ data }: any) {

    const onChange = useCallback((evt: { target: { value: any; }; }) => {
        console.log(evt.target.value);
    }, []);
    const ctrlPress = useKeyPress("Control");
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [value, setValue] = useState(data.label);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleCloseDialog2 = () => setOpenDialog2(false);

    return (
        <>
            <Paper style={{ padding: 10 }}  >
                <div onClick={() => { console.log("node clicked"); if (ctrlPress) setOpenDialog(true) }}>
                    <Handle type="target" position={Position.Top} style={handleStyle} />
                    {value}
                    <Handle type="source" position={Position.Right} style={handleStyle} />
                    <Handle type="source" position={Position.Bottom} style={handleStyle} />
                    <Handle type="source" position={Position.Left} style={handleStyle} />

                </div>

            </Paper>
            <ActionDialog2 fullScreen={true} actions={<><Button onClick={() => { console.log("nested node clicked"); setOpenDialog2(true) }}>open nested dialog</Button><Button onClick={handleCloseDialog}>close</Button> </>} open={openDialog} onClose={handleCloseDialog} >
                <Stack p={2}>
                    <TextField value={value} onChange={(e) => setValue(e.target.value)} />
                </Stack>

                <ActionDialog2 fullScreen={true} actions={<><Button onClick={handleCloseDialog2}>close nested</Button> </>} open={openDialog2} onClose={handleCloseDialog2} >
                    <Stack justifyContent="center" sx={{ height: "100%" }}>
                        <Stack p={2} direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                            <div> nested dialog </div>
                        </Stack>
                    </Stack>

                </ActionDialog2>
            </ActionDialog2>
        </>

    );
}