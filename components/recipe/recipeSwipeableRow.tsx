import React, { useState } from 'react';
import { Animated } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../global/styles';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface Props {
    children: React.ReactNode;
    deleteItem: Function;
}

const RecipeSwipeableRow: React.FC<Props> = ({ children, deleteItem }) => {
    const [visible, setVisible] = useState(true);

    const renderRightActions = (progress: any, dragX: any) => {
        const trans = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
        });
        return (
            <RectButton
                style={styles.swipeableRightButton}>
                <AnimatedIcon
                    name="delete-forever"
                    size={30}
                    color="black"
                    style={styles.swipeableRightIcon}
                />
            </RectButton>
        );
    }

    const deleteAndHide = () => {
        setVisible(false);
        deleteItem();
    }

    if (!visible)
        return null;

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableOpen={(direction) => direction == 'right' ? deleteAndHide() : null}
            friction={2}
            rightThreshold={100}
        >
            {children}
        </Swipeable>
    );
}

export default RecipeSwipeableRow;