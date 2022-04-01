/**
 * Handles the user interacting with a DataPoint on the Scatter chart and the need to display a tooltip
 * @param  {Function} options.dispatch     The redux store dispatch function
 * @param  {String} options.fillColor      The color
 * @param  {String} options.x              The key for the x value
 * @param  {String} options.y              The key for the y value
 * @return {Function}                      A function to set the tooltip datum
 */
const useTooltip = ({ dispatch, fillColor, x, y }) => {
    const [datum, setDatum] = useState(null);

    useEffect(() => {
        if (!datum) return;

        const tooltipItemX = {
            type: "value",
            datum,
            name: x,
            value: datum[x],
        };
        const tooltipItemY = {
            type: "value",
            datum,
            name: y,
            value: datum[y],
        };

        dispatch(eventActions.setTooltipBorderColor(fillColor));
        dispatch(eventActions.addTooltipItem(tooltipItemX));
        dispatch(eventActions.addTooltipItem(tooltipItemY));

        return () => {
            dispatch(eventActions.setTooltipBorderColor(undefined));
            dispatch(eventActions.removeTooltipItem(tooltipItemX));
            dispatch(eventActions.removeTooltipItem(tooltipItemY));
        };
    }, [dispatch, fillColor, name, key, value]);

    return setDatum;
};

export { useTooltip };
