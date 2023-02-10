import { withSVG } from "../../hoc";
import { EventReceiver as EventReceiverBase, IEventReceiverBaseProps } from "./EventReceiver";

export type IEventReceiverProps = Omit<IEventReceiverBaseProps, "layer">

export const EventReceiver = withSVG<IEventReceiverProps>(EventReceiverBase, "event-receiver");
