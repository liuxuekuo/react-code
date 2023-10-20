import {
	unstable_getCurrentPriorityLevel,
	unstable_IdlePriority,
	unstable_ImmediatePriority,
	unstable_NormalPriority,
	unstable_UserBlockingPriority
} from 'scheduler';
import { FiberRootNode } from './fiber';

export type Lane = number;
export type Lanes = number;

// 同步优先级
export const SyncLane = 0b0001;
// 没有 不更新
export const NoLane = 0b0000;
export const NoLanes = 0b0000;

// 输入框优先级，用户交互优先级
export const InputContinuousLane = 0b0010;

// 默认
export const DefaultLane = 0b0100;

// 空闲优先级
export const IdleLane = 0b1000;

export function mergeLanes(laneA: Lane, laneB: Lane): Lanes {
	return laneA | laneB;
}

export function isSubsetOfLanes(set: Lanes, subset: Lanes) {
	return (set & subset) === subset;
}

export function requestUpdateLane() {
	// TODO render阶段触发更新

	// 从上下文环境获取Scheduler优先级
	const schedulerPriority = unstable_getCurrentPriorityLevel();
	const updateLane = schedulerPriorityToLane(schedulerPriority);
	return updateLane;
}

export function getHighestPriorityLane(lanes: Lanes): Lane {
	return lanes & -lanes;
}

export function markRootFinished(root: FiberRootNode, lane: Lane) {
	root.pendingLanes &= ~lane;
}

export function lanesToSchedulerPriority(lanes: Lanes) {
	const lane = getHighestPriorityLane(lanes);
	if (lane === SyncLane) {
		return unstable_ImmediatePriority;
	}
	if (lane === InputContinuousLane) {
		return unstable_UserBlockingPriority;
	}
	if (lane === DefaultLane) {
		return unstable_NormalPriority;
	}
	return unstable_IdlePriority;
}

export function schedulerPriorityToLane(schedulerPriority: number): Lane {
	if (schedulerPriority === unstable_ImmediatePriority) {
		return SyncLane;
	}
	if (schedulerPriority === unstable_UserBlockingPriority) {
		return InputContinuousLane;
	}
	if (schedulerPriority === unstable_NormalPriority) {
		return DefaultLane;
	}
	return NoLane;
}
