import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const defaultToolbarStyles = {
    iconButton: {
    },
};

const CustomToolbar = props => {
    const { classes } = props;
    const history = useHistory();
    
    const handleClick = () => {
        history.push(props.addPath);
    }

    return (
        <React.Fragment>
            <Tooltip title={"Adicionar"}>
            <IconButton className={classes.iconButton} onClick={() => handleClick()}>
                <AddIcon className={classes.deleteIcon} />
            </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);