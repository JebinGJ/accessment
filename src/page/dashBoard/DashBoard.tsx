import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import styles from './DashBoard.module.css'

type Child = {
    content: string;
    id: string;
    value: string;
    childArr: Child[];
};
export const DashBoard = () => {
    const [AddPrimaryOpen, setAddPrimaryOpen] = useState(false)
    const [addText, setAddText] = useState('')
    const [dataTree, setDataTree] = useState<any>([])

    const handleAddParent = () => {
        const sampleObj = { id: `parent${dataTree.length}`, content: addText, childArr: [] }
        setDataTree([...dataTree, sampleObj])
    }

    const addChild = (parentId: string) => {
        const newChild: Child = {
            content: `New Child`,
            id: `child-${Math.random()}`,
            value: '',
            childArr: [],
        };

        const updatedData = addChildRecursively(dataTree, parentId, newChild);
        setDataTree(updatedData);
    };

    const addChildRecursively = (
        tree: Child[],
        parentId: string,
        newChild: Child
    ): Child[] => {
        return tree.map((node) => {
            if (node.id === parentId) {
                // Use the correct 'childArr' key here
                return { ...node, childArr: [...node.childArr, newChild] };
            }
            return {
                ...node,
                childArr: addChildRecursively(node.childArr, parentId, newChild),
            };
        });
    };


    const deleteChild = (childId: string) => {
        const updatedData = deleteChildRecursively(dataTree, childId);
        setDataTree(updatedData);
    };

    const deleteChildRecursively = (
        tree: Child[],
        childId: string
    ): Child[] => {
        return tree
            .map((node) => ({
                ...node,
                childArr: deleteChildRecursively(node.childArr, childId),
            }))
            .filter((node) => node.id !== childId);
    };

    const renderTree = (tree: Child[], depth: number = 0) => {
        return tree.map((item) => (
            <Box key={item.id} style={{ marginLeft: depth * 20 }} my={1}>
                <Box className={styles.parent}>
                    <Box>{item.content}</Box>
                    <Box>
                        <Button onClick={() => addChild(item.id)} style={{ marginLeft: '10px' }}>Add Child</Button>
                        <Button onClick={() => deleteChild(item.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                    </Box>
                </Box>
                {item.childArr.length > 0 && (
                    <Box>{renderTree(item.childArr, depth + 1)}</Box>
                )}
            </Box>
        ));
    };

    return (
        <Box className={styles.DashBoardCont}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box>
                    Group Management
                </Box>
                <Box>
                    <Button onClick={() => setAddPrimaryOpen(!AddPrimaryOpen)}>
                        Add Primary Group
                    </Button>
                    {AddPrimaryOpen ? <Box mb={1}>
                        <TextField size='small' onChange={(e) => setAddText(e.target.value)} />
                        <Button onClick={() => handleAddParent()} >Add</Button>
                        <Button onClick={() => setAddPrimaryOpen(!AddPrimaryOpen)}>Cancel</Button>
                    </Box> : null}
                </Box>
            </Box>
            <Box className={styles.DashBoardParent}>
                {renderTree(dataTree)}
            </Box>
        </Box>
    )
}