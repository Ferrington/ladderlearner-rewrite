import SpecialDragOverlay from '@/features/RoutineEditor/components/SpecialDragOverlay';
import {
  selectBranchChildren,
  selectDestructiveChildIndex,
} from '@/store/routine/routineSelectors';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  branchId: string;
  children?: ReactNode;
};

export default function BranchAnd({ branchId, children: componentChildren }: Props) {
  const children = useSelector(selectBranchChildren(branchId));

  const destructiveLoc = useSelector(selectDestructiveChildIndex(branchId));

  return (
    <>
      {children.map((ele, i) => {
        // const landingPadGoesHere = extraLandingPadLoc != null && extraLandingPadLoc - 1 === i;

        if (ele.type === 'OR') {
          // return (
          //   <BranchOr
          //     key={ele.id}
          //     branchId={ele.id}
          //     routine={routine}
          //     destructive={destructiveLoc === i}
          //   >
          //     {landingPadGoesHere && (
          //       <InstructionDropArea
          //         parent={branch.id}
          //         index={extraLandingPadLoc}
          //         extra={extraLandingPadLoc}
          //       />
          //     )}
          //   </BranchOr>
          // );
        } else if (ele.type === 'Instruction' && ele.displayType === 'Special') {
          // const instructionChild = landingPadGoesHere && (
          //   <InstructionDropArea
          //     parent={branch.id}
          //     index={extraLandingPadLoc}
          //     extra={extraLandingPadLoc}
          //   />
          // );

          return (
            <SpecialDragOverlay
              key={ele.id}
              instructionId={ele.id}
              // instructionChild={instructionChild}
              destructive={destructiveLoc === i}
            />
          );
        } else if (ele.type === 'Instruction' && ele.displayType === 'Box') {
          // const instructionChild = landingPadGoesHere && (
          //   <InstructionDropArea
          //     parent={branch.id}
          //     index={extraLandingPadLoc}
          //     extra={extraLandingPadLoc}
          //   />
          // );
          // return (
          //   <BoxDragOverlay
          //     key={ele.id}
          //     routine={routine}
          //     instructionId={ele.id}
          //     instructionChild={instructionChild}
          //     destructive={destructiveLoc === i}
          //   />
          // );
        } else {
          throw new Error(`Unexpected child of BranchAnd: ${branchId}`);
        }
      })}
      {componentChildren}
    </>
  );
}
