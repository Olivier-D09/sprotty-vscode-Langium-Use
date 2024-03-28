/********************************************************************************
 * Copyright (c) 2020 TypeFox and others.
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
import { inject, injectable } from 'inversify';
import { SprottyDiagramIdentifier } from 'sprotty-vscode-protocol';
import { CodeAction, Range, CodeActionRequest, CodeActionParams, Command } from 'vscode-languageserver-protocol';

import { LanguageClientProxy } from './language-client-proxy';

@injectable()
export class CodeActionProvider {

    @inject(LanguageClientProxy) readonly languageClientProxy: LanguageClientProxy;
    @inject(SprottyDiagramIdentifier) readonly diagramIdentifier: SprottyDiagramIdentifier;

    async getCodeActions(range: Range, codeActionKind: string): Promise<(CodeAction | Command)[]> {
        console.log('code-action-provider.ts: getCodeActions() called.');
        const codeActions = await this.languageClientProxy.sendRequest(CodeActionRequest.type, <CodeActionParams> {
            textDocument: {
                uri: this.diagramIdentifier.uri
            },
            range,
            context: {
                diagnostics: [],
                only: [codeActionKind]
            }
        });
        return codeActions !== null ? codeActions : [];
    }
}

