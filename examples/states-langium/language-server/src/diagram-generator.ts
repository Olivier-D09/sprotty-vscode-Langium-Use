/********************************************************************************
 * Copyright (c) 2021 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { GeneratorContext, LangiumDiagramGenerator } from 'langium-sprotty';
import { SModelRoot, SNode, SLabel, SPort } from 'sprotty-protocol';
import { Model } from './generated/ast.js';

export class StatesDiagramGenerator extends LangiumDiagramGenerator {

    protected generateRoot(args: GeneratorContext<Model>): SModelRoot {
        const { document } = args;
        const sm = document.parseResult.value;
        return {
            type: 'graph',
            id: sm.$type ?? 'root',
            children: [
                <SNode>{
                    type: 'node',
                    id: 'newPerson',
                    children: [
                        <SLabel>{
                            type: 'label',
                            id: 'newPerson.label',
                            text: 'try1'
                        },
                        <SPort>{
                            type: 'port',
                            id: 'newPerson.Transition',
                        }
                    ],
                    layout: 'stack',
                    layoutOptions: {
                        paddingTop: 10.0,
                        paddingBottom: 10.0,
                        paddingLeft: 10.0,
                        paddingRight: 10.0
                    }
                },

                // ...sm.persons.map(s => this.generateNode(s, args)),
                // ...sm.greetings.map(t => this.generateEdge(t, args))
            ]
        };
    }

    // protected generateNode(persons: Person, { idCache }: GeneratorContext<Model>): SNode {
    //     const nodeId = idCache.uniqueId(persons.name, persons) ?? 'unnamed';
    //     console.log('nodeId:', nodeId)
    //     return {
    //         type: 'node',
    //         id: nodeId,
    //         children: [
    //             <SLabel>{
    //                 type: 'label',
    //                 id: idCache.uniqueId(nodeId + '.label'),
    //                 text: persons.name ?? 'unnamed'
    //             },
    //             <SPort>{
    //                 type: 'port',
    //                 id: idCache.uniqueId(nodeId + '.newTransition') ?? 'newTransition',
    //             }
    //         ],
    //         layout: 'stack',
    //         layoutOptions: {
    //             paddingTop: 10.0,
    //             paddingBottom: 10.0,
    //             paddingLeft: 10.0,
    //             paddingRight: 10.0
    //         }
    //     };
    // }

    // protected generateEdge(greetings: Greeting, { idCache }: GeneratorContext<Model>): SEdge {
    //     const sourceId = idCache.getId(greetings.$container);
    //     const targetId = idCache.getId(greetings);
    //     const edgeId = idCache.uniqueId(`${sourceId}:${greetings}:${targetId}`, greetings);
    //     return {
    //         type: 'edge',
    //         id: edgeId,
    //         sourceId: sourceId!,
    //         targetId: targetId!,
    //         children: [
    //             <SLabel>{
    //                 type: 'label:xref',
    //                 id: idCache.uniqueId(edgeId + '.label'),
    //                 text: greetings.$type
    //             }
    //         ]
    //     };
    // }

}
