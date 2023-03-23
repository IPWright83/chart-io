import { EventReceiver as EventReceiverBase, IEventReceiverBaseProps } from "./EventReceiver";
import { withSVG } from "../../hoc";

export type IEventReceiverProps = Omit<IEventReceiverBaseProps, "layer">;

export const EventReceiver = withSVG<IEventReceiverProps>(EventReceiverBase, "event-receiver");
