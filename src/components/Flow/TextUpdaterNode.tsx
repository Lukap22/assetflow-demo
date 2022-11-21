import { Paper, Stack, TextField } from '@mui/material';
import ActionDialog2 from 'components/mui/ActionDialog2';
import { useKeyPress } from 'hooks/useKeyPress';
import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { padding: 3 };

export default function TextUpdaterNode({ data }) {

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);
    const ctrlPress = useKeyPress("Control");
    const [openDialog, setOpenDialog] = useState(false);
    const [value, setValue] = useState(data.label);
    const handleCloseDialog = () => setOpenDialog(false);

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
            <ActionDialog2 actions={undefined} open={openDialog} onClose={handleCloseDialog} >
                <Stack p={2}>
                    <TextField value={value} onChange={(e) => setValue(e.target.value)} />
                </Stack>
            </ActionDialog2>
        </>

    );
}